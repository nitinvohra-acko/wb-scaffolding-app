"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Select, MenuItem, Button, Chip, Typography, Box } from "@mui/material";
import Link from "next/link";
import { userDataList } from "../constants";

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
const data: DataRow[] = userDataList;

const assignees: string[] = ["user_1", "user_2", "user_3"]; // Sample dropdown options

const priorityOptions = {
  P0: { label: "High", color: "red" },
  P1: { label: "Medium", color: "#2563EB" },
  P2: { label: "Low", color: "green" },
} as const;

const DataTable: React.FC<{}> = () => {
  const [tableData, setTableData] = useState<DataRow[]>(data);

  const handleAssigneeChange = (id: string, newAssignee: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, assignee: newAssignee } : row
      )
    );
  };

  const columns: GridColDef[] = [
    {
      field: "proposer_name",
      headerName: "Proposer Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams<GridValidRowModel>) => {
        return (
          <Box height={"100%"} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params: GridRenderCellParams<GridValidRowModel>) => {
        const priority =
          priorityOptions[params.value as keyof typeof priorityOptions];
        return (
          <Chip
            label={priority.label}
            style={{ backgroundColor: priority.color, color: "white" }}
            size="small"
          />
        );
      },
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<GridValidRowModel, DataRow>
      ) => (
        <Select
          value={params.value}
          onChange={(e: any) =>
            handleAssigneeChange(params.row.id, e.target.value)
          }
          fullWidth
          size="small"
        >
          {assignees.map((assignee) => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<GridValidRowModel, DataRow>
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
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: "background.paper",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "background.paper",
          },
        }}
      />
    </div>
  );
};

export default DataTable;
