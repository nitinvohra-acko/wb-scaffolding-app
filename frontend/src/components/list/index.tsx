"use client";
import React from "react";
import MemberTable from "./table";
import { Box } from "@mui/material";
import TableHeader from "./header";
const DataTableComponent: React.FC = () => {
  return (
    <>
      <Box>
        <TableHeader
          title="Proposer List"
          onSearch={() => {}}
          onFilter={() => {}}
          onSort={() => {}}
        />
        <Box sx={{ paddingX: 8 }}>
          <MemberTable />
        </Box>
      </Box>
    </>
  );
};

export default DataTableComponent;
