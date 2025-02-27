export interface TaskResponse {
  searchable_fields: any;
  filters: any;
  sort: any;
  search_str: '';
  result: any;
  total_count: 0;
  page_no: 1;
  page_size: 10;
}
export interface TaskRequest {
  searchable_fields: [];
  filters: [];
  sort: [];
  search_str: '';
  page_no: 1;
  page_size: 10;
}

export interface SearchableFields {}
export interface FilterType {}
