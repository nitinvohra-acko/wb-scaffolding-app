export interface TaskResponse {
  searchable_fields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  search_str: string;
  result: any;
  total_count: 0;
  page_no: 1;
  page_size: 10;
}
export interface TaskRequest {
  searchable_fields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  search_str: string;
  page_no: 1;
  page_size: 10;
}

export interface SearchableFields {}
export interface FilterOption {
  value: string;
  count: number;
  is_selected: boolean;
}

export interface FilterField {
  field_display_name: string;
  field_name: string;
  field_type: string;
  options: FilterOption[];
}

export interface SearchableFieldsTypetype {
  field_display_name: string;
  field_name: string;
  field_type: string;
  value: string | null;
}
