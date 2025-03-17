export interface FilterOption {
  value: string;
  count: number;
  isSelected: boolean;
}

export interface FilterField {
  fieldDisplayName: string;
  fieldName: string;
  fieldType: string;
  options?: FilterOption[];
  rangeValue?: {
    // Used for 'range' type filters
    from: Date | null;
    to: Date | null;
  };
}

export interface SearchableFieldsTypetype {
  fieldDisplayName: string;
  fieldName: string;
  fieldType: string;
  value: string | null;
}
