'use client';
import React, { useCallback, useEffect, useState } from 'react';
import MemberTable from './table';
import { Box, Button, Typography } from '@mui/material';
import TableHeader from './header';
import AddTaskModal from './component/addTaskModal';

import useTasks from '@/store/tasklist';
import useTaskLists from '@/hooks/useTaskLists';
import { TaskRequest } from '@/types/task';
const INIT_FILTER = {
  searchable_fields: [],
  filters: [],
  sort: [],
  search_str: '',
  page_no: 1,
  page_size: 10,
};
const DataTableComponent: React.FC = () => {
  const { taskResponse, status } = useTasks.getState();
  // const [allTask, setAllTask] = useState(null);
  const [openAddTask, setOpenAddTask] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { fetchTaskLists } = useTaskLists();
  useEffect(() => {
    // if (!taskResponse) {
    fetchTaskLists(INIT_FILTER as TaskRequest);
    // }
  }, []);
  // const fetchAlltask = async () => {
  //   try {
  //     const response: any = await apiClient('/task', 'GET');
  //     setAllTask(response);
  //   } catch (err) {
  //     console.log('error', err);
  //   }
  // };
  console.log(taskResponse, 'tas');
  if (status === 'loading') {
    return <>loading..</>;
  }
  return (
    <>
      {taskResponse?.result?.length > 0 ? (
        <Box>
          <TableHeader
            title="Task Data"
            onSearch={() => {}}
            onFilter={() => {}}
            onSort={() => {}}
            handleNewTask={() => {
              setOpenAddTask(true);
            }}
          />
          <Box sx={{ my: 2 }}>
            <MemberTable />
          </Box>
        </Box>
      ) : (
        <Typography>No data available</Typography>
      )}
    </>
  );
};

export default DataTableComponent;
