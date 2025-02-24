import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LeftSection from "./Overview";
import RightSection from "./tabs";
import { userDataList, DataRow } from "../constants";
import { useParams } from "next/navigation";

const PageLayout: React.FC<{ pageId: string[] }> = ({ pageId }) => {
  const params = useParams();
  console.log("params", params);
  const [userData, setUserData] = useState<DataRow | undefined>();
  const [taskDetail, setTaskDetail] = useState(null);

  useEffect(() => {
    if (Array.isArray(params.slug) && params.slug.length > 0) {
      fetchTaskDetail(params.slug[0]);
    }
  }, []);

  const fetchTaskDetail = async (id: string) => {
    try {
      const resp = await fetch("/task/" + id);
      if (resp.ok) {
        const response = await resp.json();
        console.log("reapose", response);
        setTaskDetail(response);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <LeftSection taskData={taskDetail} />
      <RightSection />
    </Box>
  );
};

export default PageLayout;
