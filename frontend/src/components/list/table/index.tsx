'use client';
import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { Select, MenuItem, Button, Chip, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { userDataList } from '../constants';
import useTasks from '@/store/tasklist';
import { useShallow } from 'zustand/shallow';

type DataRow = {
  id: string;
  proposer_name: string;
  priority: keyof typeof priorityOptions;
  assignee: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
  calculated_priority: number;
  business_entity: Record<string, unknown>;
};

const assignees: string[] = ['user_1', 'user_2', 'user_3']; // Sample dropdown options

const priorityOptions = {
  P0: { label: 'High', color: 'red' },
  P1: { label: 'Medium', color: '#2563EB' },
  P2: { label: 'Low', color: 'green' },
} as const;

const DataTable: React.FC = () => {
  const { taskResponse, hoist, initFilters } = useTasks(
    useShallow((store) => ({
      taskResponse: store.taskResponse,
      hoist: store.hoist,
      initFilters: store.initFilters,
    })),
  );
  console.log('data', taskResponse?.result);
  // const handleAssigneeChange = (id: string, newAssignee: string) => {
  //   setTableData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id ? { ...row, assignee: newAssignee } : row
  //     )
  //   );
  // };

  const columns: GridColDef[] = [
    {
      field: 'assignee',
      headerName: 'Assignee',
      flex: 1,
    },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
    },

    {
      field: 'detail',
      headerName: 'Detail',
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<GridValidRowModel, DataRow>,
      ) => (
        <Link href={`/list/${params.row.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            Detail
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      {taskResponse?.result && (
        <DataGrid
          rows={taskResponse?.result}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id}
          sx={{
            boxShadow: 2,
            border: 1,
            borderColor: 'background.paper',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'background.paper',
            },
          }}
        />
      )}
    </div>
  );
};

export default DataTable;
