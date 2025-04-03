import { Operator } from '@/types/automationRule';

export const automationConditionOperators: Operator[] = [
  {
    id: 'equals',
    name: 'equals',
    displayName: 'Equals',
    applicableTypes: ['term', 'String', 'range'],
  },
  {
    id: 'not_equals',
    name: 'not equals',
    displayName: 'Not Equals',
    applicableTypes: ['term', 'String', 'range'],
  },
  {
    id: 'contains',
    name: 'contains',
    displayName: 'Contains',
    applicableTypes: ['term', 'String', 'range'],
  },
  {
    id: 'not_contains',
    name: 'not contains',
    displayName: 'Does Not Contain',
    applicableTypes: ['term', 'String'],
  },
  {
    id: 'starts_with',
    name: 'starts with',
    displayName: 'Starts With',
    applicableTypes: ['term', 'String', 'range'],
  },
  {
    id: 'ends_with',
    name: 'ends with',
    displayName: 'Ends With',
    applicableTypes: ['term', 'String', 'range'],
  },
  {
    id: 'greater_than',
    name: 'greater than',
    displayName: 'Greater Than',
    applicableTypes: ['range'],
  },
  {
    id: 'less_than',
    name: 'less than',
    displayName: 'Less Than',
    applicableTypes: ['range'],
  },
  {
    id: 'greater_than_equal',
    name: 'greater than or equal',
    displayName: 'Greater Than or Equal',
    applicableTypes: ['range'],
  },
  {
    id: 'less_than_equal',
    name: 'less than or equal',
    displayName: 'Less Than or Equal',
    applicableTypes: ['range'],
  },
  {
    id: 'before',
    name: 'before',
    displayName: 'Before',
    applicableTypes: ['range'],
  },
  {
    id: 'after',
    name: 'after',
    displayName: 'After',
    applicableTypes: ['range'],
  },
];
