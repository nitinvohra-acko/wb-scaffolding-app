"use client";
import NavBar from "@/components/DashboardLayout/navbar";
import TopBar from "@/components/DashboardLayout/topbar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import * as React from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const ChildrenContainer = styled("div")(({ theme }) => ({
  minHeight: "80vh",
  background: "#f8f7fc",
  padding: "20px",
}));

export default function MiniDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const pathName = usePathname();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      {!pathName?.includes("/login") && (
        <NavBar open={open} handleDrawerClose={handleDrawerClose} />
      )}
      <Box component="main" sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <DrawerHeader />
        <ChildrenContainer>{children}</ChildrenContainer>
      </Box>
    </Box>
  );
}
