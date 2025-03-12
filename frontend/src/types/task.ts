export interface TaskResponse {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  result: any;
  totalCount: 0;
  pageNo: 1;
  pageSize: 10;
}
export interface TaskRequest {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  pageNo: 1;
  pageSize: 10;
}

export interface SearchableFields {}
export interface FilterOption {
  value: string;
  count: number;
  is_selected: boolean;
}

export interface FilterField {
  fieldDisplayName: string;
  fieldName: string;
  fieldType: string;
  options: FilterOption[];
}

export interface SearchableFieldsTypetype {
  fieldDisplayName: string;
  fieldName: string;
  fieldType: string;
  value: string | null;
}
