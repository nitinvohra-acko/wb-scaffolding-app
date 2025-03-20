import { FilterField, FilterFields, SearchableFieldsTypetype } from './common';

export interface UsersResponse {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterFields[];
  sort: any;
  searchStr: string;
  result: User[];
  totalCount: number;
  pageNo: number;
  pageSize: number;
}
export interface UsersRequest {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterFields[];
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
  firstName: string;
  lastName: string;
  group: string;
  active: boolean;
  id: string;
}
