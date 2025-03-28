'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // optional utility for Tailwind class merging
import useTasks from '@/store/tasklist';
import { useShallow } from 'zustand/shallow';

type DataRow = {
  id: string;
  proposer_name: string;
  priority: 'P0' | 'P1' | 'P2';
  assignee: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
  calculated_priority: number;
  business_entity: Record<string, unknown>;
};

const priorityOptions = {
  P0: { label: 'High', color: 'text-red-600' },
  P1: { label: 'Medium', color: 'text-blue-600' },
  P2: { label: 'Low', color: 'text-green-600' },
};

export default function DataTable() {
  const { taskResponse } = useTasks(
    useShallow((store) => ({
      taskResponse: store.taskResponse,
    })),
  );

  const columns = React.useMemo<ColumnDef<DataRow>[]>(
    () => [
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
          const priority = row.original.priority;
          const label = priorityOptions[priority]?.label;
          const color = priorityOptions[priority]?.color;
          return <span className={cn('font-medium', color)}>{label}</span>;
        },
      },
      {
        id: 'detail',
        header: 'Detail',
        cell: ({ row }) => (
          <Link href={`/list/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Detail
            </Button>
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: taskResponse?.result || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log('taskResponse', taskResponse);
  return (
    <div className="rounded-md border border-gray-200 shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 font-medium text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
