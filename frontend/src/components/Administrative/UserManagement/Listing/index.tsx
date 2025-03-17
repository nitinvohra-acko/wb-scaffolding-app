'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useTaskLists from '@/hooks/useTaskLists';
import useUsers from '@/hooks/useUsers';
import useTasks from '@/store/tasklist';
import useUsersStore from '@/store/users';
import { TaskRequest } from '@/types/task';
import React, { useEffect, useState } from 'react';
import UserFilters from '../Filter';
import UserSearch from '../Searching';
import UserTable from '../Table';
import { UsersRequest } from '@/types/users';

const INIT_FILTER: UsersRequest = {
  searchableFields: [],
  filters: [],
  sort: [],
  searchStr: '',
  pageNo: 1,
  pageSize: 10,
};

const Listing: React.FC = () => {
  const { usersResponse, status } = useUsersStore.getState();
  const { fetchUsersLists, loading } = useUsers();

  useEffect(() => {
    fetchUsersLists(INIT_FILTER);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <UserFilters />
          <div className="flex-1">
            <UserSearch />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : status === 'error' ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              Error loading users. Please try again.
            </div>
          ) : (
            <>
              <UserTable users={usersResponse?.result || []} />
              {/* <UserPagination totalCount={data?.totalCount || 0} pageSize={pageSize} pageNo={pageNo} /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
