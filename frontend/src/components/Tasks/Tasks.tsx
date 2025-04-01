'use client';

import { useState, useEffect } from 'react';
import {
  DataTable,
  type ColumnDef,
} from '@/components/Widgets/data-table/data-table';
import { Button } from '@/components/ui/button';
import type { TaskRequest } from '@/types/task';
import useTasks from '@/store/tasklist';
import useTaskLists from '@/hooks/useTaskLists';
import Link from 'next/link';
import { FilterField, FilterFields } from '@/types/common';
import { useAnalytics } from '@/hooks/useAnalytics';

const INIT_FILTER: TaskRequest = {
  searchableFields: [],
  filters: [],
  sort: [],
  searchStr: '',
  pageNo: 1,
  pageSize: 10,
};
export default function TaskDataPage() {
  const { page } = useAnalytics();
  const { taskResponse: taskData, status } = useTasks.getState();
  const { fetchTaskLists: fetchData, loading } = useTaskLists();

  // Define your columns
  const columns: ColumnDef[] = [
    { key: 'assignee', header: 'Assignee' },
    { key: 'id', header: 'ID' },
    { key: 'status', header: 'Status' },
    { key: 'priority', header: 'Priority' },
    { key: 'actions', header: 'Detail' },
  ];

  // Handle search
  const handleSearch = (searchStr: string) => {
    const request: TaskRequest = {
      ...taskData!,
      searchStr,
      pageNo: 1, // Reset to first page on new search
    };
    fetchData(request);
  };

  // Handle filter
  const handleFilter = (filters: FilterFields[]) => {
    const request: TaskRequest = {
      ...taskData!,
      filters,
      pageNo: 1, // Reset to first page on new filter
    };
    fetchData(request);
  };

  // Handle page change
  const handlePageChange = (pageNo: number) => {
    const request: TaskRequest = {
      ...taskData!,
      pageNo,
    };
    fetchData(request);
  };

  // Handle page size change
  const handlePageSizeChange = (pageSize: number) => {
    const request: TaskRequest = {
      ...taskData!,
      pageSize,
      pageNo: 1, // Reset to first page on page size change
    };
    fetchData(request);
  };

  // Custom cell renderer
  const renderCell = (row: any, column: ColumnDef) => {
    if (column.key === 'actions') {
      return (
        <Link href={'/task-detail/' + row?.id}>
          <Button variant="outline" size="sm">
            Detail
          </Button>
        </Link>
      );
    }

    // Status cell with styling
    if (column.key === 'status') {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {row.status}
        </span>
      );
    }

    return row[column.key];
  };
  useEffect(() => {
    fetchData(INIT_FILTER);
    page('task_listing');
  }, []);
  if (!taskData) {
    return <>loading...</>;
  }
  return (
    <div className="container mx-auto py-6">
      <DataTable
        tableTitle={'Task data'}
        data={taskData.result}
        columns={columns}
        totalCount={taskData.totalCount}
        pageSize={taskData.pageSize}
        pageNo={taskData.pageNo}
        searchableFields={taskData.searchableFields}
        filters={taskData.filters}
        searchStr={taskData.searchStr}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        renderCell={renderCell}
        isLoading={loading}
      />
    </div>
  );
}
