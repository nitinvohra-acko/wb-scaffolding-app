import React from "react";
import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

interface LayoutProps2 {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ops Tech Tool
          </Typography>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" href="/api/auth/logout">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Layout;
