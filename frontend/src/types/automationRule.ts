export interface Event {
  eventId: string;
  eventName: string;
}

export interface ActionOption {
  id: string;
  name: string;
}

export interface ActionProperty {
  type: 'multi-select' | string;
  options: ActionOption[];
}

export interface Action {
  id: string;
  name: string;
  properties: ActionProperty;
}

export interface FieldParam {
  fieldDisplayName: string;
  fieldName: string | null;
  variableName: string;
  fieldType: AttributeType;
  isSearchable: boolean;
  isFilterable: boolean;
}

export interface EntityParam {
  name: string;
  fieldParams: FieldParam[];
}

export interface AutomationEventResponse {
  eventsList: Event[];
  actionsList: Action[];
  entityParams: EntityParam[];
}

export type AttributeType = 'term' | 'range' | 'String';
export type LogicalOperator = 'AND' | 'OR';
export interface Operator {
  id: string;
  name: string;
  displayName: string;
  applicableTypes: AttributeType[]; // Which attribute types this operator can be used with
}
export interface Condition {
  id: string;
  entity: string;
  attribute: string; // This will store the fieldName
  variableName?: string; // This will store the full path for MVEL
  operator: string;
  value: string | number | boolean | Date;
}
export interface AutomationEventPayload {
  eventId: string;
  action: string;
  condition: string;
  options: string[];
}
