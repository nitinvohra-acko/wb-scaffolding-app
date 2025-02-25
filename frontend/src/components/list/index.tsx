"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "./table";
import { Box, Button, Typography } from "@mui/material";
import TableHeader from "./header";
import AddTaskModal from "./component/addTaskModal";

const DataTableComponent: React.FC = () => {
  const [allTask, setAllTask] = useState(null);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlltask();
  }, []);
  const fetchAlltask = async () => {
    try {
      const resp = await fetch("/task", {
        headers:{
          'Content-Type':'application/json'
        }
      });
      if (resp.ok) {
        const response = await resp.json();
        setAllTask(response);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleAddTask = (formData: any) => {
    console.log("form Data", formData);
    setOpenAddTask(false);
  };

  // const addNewTask = async (data: any) => {
  //   try {

  //     let payload ={

  //     }

  //     const resp = await fetch("/task", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  //     if (resp.ok) {
  //       fetchAlltask();
  //     }
  //   } catch (err) {
  //     console.log("something went wrong...");
  //   }
  // };

  return (
    <>
      {allTask ? (
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
          <Box sx={{ my:2 }}>
            <MemberTable data={allTask} />
          </Box>
        </Box>
      ) : (
        <Typography>...Loading</Typography>
      )}
      {/* <AddTaskModal
        open={openAddTask}
        handleClose={() => setOpenAddTask(false)}
        onSubmit={handleAddTask}
      /> */}
    </>
  );
};

export default DataTableComponent;
