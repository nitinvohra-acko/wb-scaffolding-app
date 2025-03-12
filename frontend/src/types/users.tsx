export interface UsersResponse {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  result: User[];
  totalCount: number;
  pageNo: number;
  pageSize: number;
}
export interface UsersRequest {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  pageNo: number;
  pageSize: number;
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
export interface User {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  group: string;
  active: boolean;
  id: string;
}
