import {
  AttributeType,
  Condition,
  FieldParam,
  LogicalOperator,
} from '@/types/automationRule';

/**
 * Map of attribute types to their MVEL handling
 */
const typeHandlers = {
  String: {
    equals: (path: string, value: any) => `${path} == "${value}"`,
    'not equals': (path: string, value: any) => `${path} != "${value}"`,
    contains: (path: string, value: any) => `${path}.contains("${value}")`,
    'not contains': (path: string, value: any) =>
      `!${path}.contains("${value}")`,
    'starts with': (path: string, value: any) =>
      `${path}.startsWith("${value}")`,
    'ends with': (path: string, value: any) => `${path}.endsWith("${value}")`,
  },
  term: {
    equals: (path: string, value: any) => `${path} == "${value}"`,
    'not equals': (path: string, value: any) => `${path} != "${value}"`,
    contains: (path: string, value: any) => `${path}.contains("${value}")`,
    'not contains': (path: string, value: any) =>
      `!${path}.contains("${value}")`,
    'starts with': (path: string, value: any) =>
      `${path}.startsWith("${value}")`,
    'ends with': (path: string, value: any) => `${path}.endsWith("${value}")`,
  },
  Number: {
    equals: (path: string, value: any) => `${path} == ${value}`,
    'not equals': (path: string, value: any) => `${path} != ${value}`,
    'greater than': (path: string, value: any) => `${path} > ${value}`,
    'less than': (path: string, value: any) => `${path} < ${value}`,
    'greater than or equal': (path: string, value: any) =>
      `${path} >= ${value}`,
    'less than or equal': (path: string, value: any) => `${path} <= ${value}`,
  },
  range: {
    equals: (path: string, value: any) => `${path} == "${value}"`,
    'not equals': (path: string, value: any) => `${path} != "${value}"`,
    before: (path: string, value: any) => `${path} < "${value}"`,
    after: (path: string, value: any) => `${path} > "${value}"`,
    between: (path: string, value: any, value2: any) =>
      `${path} > "${value}" && ${path} < "${value2}"`,
  },
  Boolean: {
    is: (path: string, value: any) => `${path} == ${value === 'true'}`,
    'is not': (path: string, value: any) => `${path} != ${value === 'true'}`,
  },
  Enum: {
    equals: (path: string, value: any) => `${path} == "${value}"`,
    'not equals': (path: string, value: any) => `${path} != "${value}"`,
    in: (path: string, values: any[]) =>
      `${values.map((v) => `${path} == "${v}"`).join(' || ')}`,
    'not in': (path: string, values: any[]) =>
      `!(${values.map((v) => `${path} == "${v}"`).join(' || ')})`,
  },
};

/**
 * Get attribute type from attribute name and entity
 */
export const getAttributeType = (
  attributeName: string,
  entityName: string,
  entities: Record<string, { attributes: Record<string, FieldParam> }>,
): AttributeType => {
  if (!entities[entityName]?.attributes[attributeName]) {
    return 'term'; // Default to string if not found
  }
  return entities[entityName].attributes[attributeName].fieldType;
};

/**
 * Get variable name (full path) for an attribute
 */
export const getVariableName = (
  attributeName: string,
  entityName: string,
  entities: Record<string, { attributes: Record<string, FieldParam> }>,
): string => {
  if (!entities[entityName]?.attributes[attributeName]) {
    return `${entityName.toLowerCase()}.${attributeName}`; // Default path if not found
  }
  return entities[entityName].attributes[attributeName].variableName;
};

/**
 * Converts a set of conditions to an MVEL expression
 */
export const convertToMVEL = (
  conditions: Condition[],
  logicalOperator: LogicalOperator,
  entities: Record<string, { attributes: Record<string, FieldParam> }>,
): string => {
  if (conditions.length === 0) return '';

  const conditionExpressions = conditions
    .map((condition) => {
      const { entity, attribute, operator, value, variableName } = condition;
      if (!entity || !attribute || !operator) return '';

      // Use the provided variableName if available, otherwise construct it
      const attributePath =
        variableName || getVariableName(attribute, entity, entities);
      const attributeType = getAttributeType(attribute, entity, entities);

      // Get the appropriate handler for this type and operator
      const typeHandler =
        typeHandlers[attributeType as keyof typeof typeHandlers] || null;
      if (!typeHandler) return '';

      const operatorHandler =
        typeHandler[operator.toLowerCase() as keyof typeof typeHandler];
      if (!operatorHandler) return '';

      // Handle special case for 'between' operator which needs two values
      if (
        operator === 'between' &&
        typeof value === 'object' &&
        'start' in value &&
        'end' in value
      ) {
        return (
          operatorHandler as (path: string, value1: any, value2: any) => string
        )(attributePath, value.start, value.end);
      }

      return (operatorHandler as (path: string, value: any) => string)(
        attributePath,
        value,
      );
    })
    .filter((expr) => expr !== '');

  // Join with logical operator and wrap in parentheses for clarity
  if (conditionExpressions.length === 1) {
    return conditionExpressions[0];
  }

  return `(${conditionExpressions.join(` ${logicalOperator.toLowerCase()} `)})`;
};

/**
 * Validates an MVEL expression
 */
export const validateMVEL = (
  expression: string,
): { isValid: boolean; error?: string } => {
  if (!expression) {
    return { isValid: false, error: 'Expression is empty' };
  }

  // Basic validation - check for balanced parentheses
  const stack: string[] = [];
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '(') {
      stack.push('(');
    } else if (expression[i] === ')') {
      if (stack.length === 0) {
        return { isValid: false, error: 'Unbalanced parentheses' };
      }
      stack.pop();
    }
  }

  if (stack.length > 0) {
    return { isValid: false, error: 'Unbalanced parentheses' };
  }

  // Check for common syntax errors
  if (expression.includes('..')) {
    return { isValid: false, error: 'Invalid path with double dots' };
  }

  if (
    expression.includes('==') &&
    expression.includes('=') &&
    !expression.includes('>=') &&
    !expression.includes('<=')
  ) {
    return { isValid: false, error: 'Possible confusion between = and ==' };
  }

  return { isValid: true };
};
