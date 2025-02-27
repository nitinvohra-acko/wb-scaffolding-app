import { Box, Divider, Tabs, Tab } from "@mui/material";
import React from "react";

const RightSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "75%", padding: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Introduction" />
        {/* <Tab label="Demographics" />
        <Tab label="Medical details" />
        <Tab label="End note" /> */}
      </Tabs>
      <Divider sx={{ my: 2 }} />
      {activeTab === 0 && (
        <Box
          sx={{
            height: 50,
            border: "solid 1px gray",
            padding: 2,
            borderRadius: 8,
          }}
        >
          "Hi, I'm Dr. [Your Name] from Acko Health Insurance. Thank you for
          choosing us...
        </Box>
      )}
      {/* Add content for other tabs as needed */}
    </Box>
  );
};

export default RightSection;
