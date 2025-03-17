import { FilterField, SearchableFieldsTypetype } from './common';

export interface TaskResponse {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  result: any;
  totalCount: number;
  pageNo: number;
  pageSize: number;
}
export interface TaskRequest {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterField[];
  sort: any;
  searchStr: string;
  pageNo: number;
  pageSize: number;
}
