import { FilterField, FilterFields, SearchableFieldsTypetype } from './common';

export interface TaskResponse {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterFields[];
  sort: any;
  searchStr: string;
  result: TaskDetail[];
  totalCount: number;
  pageNo: number;
  pageSize: number;
}
export interface TaskRequest {
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterFields[];
  sort: any;
  searchStr: string;
  pageNo: number;
  pageSize: number;
}

export interface TaskDetail {
  id: string;
  priority: 'High' | 'Low' | 'Medium';
  assignee: string;
  type: string;
  status: string;
  calculatedPriority: number;
  businessEntityImpl: any;
  createdDate: string;
  updatedDate: string;
}
