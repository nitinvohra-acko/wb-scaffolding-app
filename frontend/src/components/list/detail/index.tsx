import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LeftSection from "./Overview";
import RightSection from "./tabs";
import { userDataList, DataRow } from "../constants";

const PageLayout: React.FC<{ pageId: string[] }> = ({ pageId }) => {
  const [userData, setUserData] = useState<DataRow | undefined>();

  useEffect(() => {
    if (pageId && pageId[0]) {
      setUserData(userDataList.find((i) => i.id === pageId[0]));
    }
  }, [pageId]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <LeftSection userData={userData} />
      <RightSection />
    </Box>
  );
};

export default PageLayout;
