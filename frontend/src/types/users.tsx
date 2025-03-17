import { FilterField, SearchableFieldsTypetype } from './common';

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

export interface FilterOption {
  value: string;
  count: number;
  isSelected: boolean;
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
