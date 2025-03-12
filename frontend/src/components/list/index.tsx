'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useTaskLists from '@/hooks/useTaskLists';
import useTasks from '@/store/tasklist';
import { TaskRequest } from '@/types/task';
import React, { useEffect, useState } from 'react';
import TableHeader from './header';
import MemberTable from './table';

const INIT_FILTER: TaskRequest = {
  searchableFields: [],
  filters: [],
  sort: [],
  searchStr: '',
  pageNo: 1,
  pageSize: 10,
};

const DataTableComponent: React.FC = () => {
  const { taskResponse, status } = useTasks.getState();
  const [openAddTask, setOpenAddTask] = useState(false);
  const { fetchTaskLists } = useTaskLists();

  useEffect(() => {
    fetchTaskLists(INIT_FILTER);
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
    <>
      {taskResponse?.result?.length > 0 ? (
        <>
          <TableHeader
            title="Task Data"
            onSearch={() => {}}
            onFilter={() => {}}
            onSort={() => {}}
            handleNewTask={() => setOpenAddTask(true)}
          />
          <div className="my-4">
            <MemberTable />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </>
  );
};

export default DataTableComponent;
