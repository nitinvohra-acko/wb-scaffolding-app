'use client';

import { useState, useEffect } from 'react';
import {
  DataTable,
  type ColumnDef,
} from '@/components/Widgets/data-table/data-table';
import { Button } from '@/components/ui/button';
import useTaskLists from '@/hooks/useTaskLists';
import Link from 'next/link';
import { UsersRequest } from '@/types/users';
import useUsersStore from '@/store/users';
import { FilterField, FilterFields } from '@/types/common';
import useUsers from '@/hooks/useUsers';
import { Badge } from '@/components/ui/badge';

const INIT_FILTER: UsersRequest = {
  searchableFields: [],
  filters: [],
  sort: [],
  searchStr: '',
  pageNo: 1,
  pageSize: 10,
};
export default function usersResponsePage() {
  const { usersResponse, status } = useUsersStore.getState();
  const { fetchUsersLists: fetchData, loading } = useUsers();

  useEffect(() => {
    fetchData(INIT_FILTER);
  }, []);

  // Define your columns
  const columns: ColumnDef[] = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'firstName', header: 'First name' },
    { key: 'lastName', header: 'Last name' },
    { key: 'group', header: 'Group' },
    { key: 'active', header: 'active' },
    { key: 'actions', header: 'Detail' },
  ];

  // Handle search
  const handleSearch = (searchStr: string) => {
    const request: UsersRequest = {
      ...usersResponse!,
      searchStr,
      pageNo: 1, // Reset to first page on new search
    };
    fetchData(request);
  };

  // Handle filter
  const handleFilter = (filters: FilterFields[]) => {
    const request: UsersRequest = {
      ...usersResponse!,
      filters,
      pageNo: 1, // Reset to first page on new filter
    };
    fetchData(request);
  };

  // Handle page change
  const handlePageChange = (pageNo: number) => {
    const request: UsersRequest = {
      ...usersResponse!,
      pageNo,
    };
    fetchData(request);
  };

  // Handle page size change
  const handlePageSizeChange = (pageSize: number) => {
    const request: UsersRequest = {
      ...usersResponse!,
      pageSize,
      pageNo: 1, // Reset to first page on page size change
    };
    fetchData(request);
  };

  // Custom cell renderer
  const renderCell = (row: any, column: ColumnDef) => {
    if (column.key === 'actions') {
      return (
        <Link href={'/administrative/user/' + row?.id}>
          <Button variant="outline" size="sm">
            Detail
          </Button>
        </Link>
      );
    }

    // Status cell with styling
    if (column.key === 'active') {
      return (
        <Badge variant={row.active ? 'success' : 'destructive'}>
          {row.active ? 'Active' : 'Inactive'}
        </Badge>
      );
    }

    return row[column.key];
  };
  if (!usersResponse) {
    return <>loading...</>;
  }
  return (
    <div className="container mx-auto py-6">
      <DataTable
        tableTitle={'Users data'}
        data={usersResponse.result}
        columns={columns}
        totalCount={usersResponse.totalCount}
        pageSize={usersResponse.pageSize}
        pageNo={usersResponse.pageNo}
        searchableFields={usersResponse.searchableFields}
        filters={usersResponse.filters}
        searchStr={usersResponse.searchStr}
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
