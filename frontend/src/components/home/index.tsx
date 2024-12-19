"use client";

import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Header */}
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

      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        {/* Introduction */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom>
            Welcome to Ops Tech Tool
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Streamline your operations with a suite of powerful tools designed
            for efficiency, reliability, and automation.
          </Typography>
        </Box>

        {/* Features Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Automate repetitive tasks and save valuable time with our
                cutting-edge automation workflows.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Gain insights with real-time analytics and intuitive dashboards
                that make data actionable.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Collaborate seamlessly across teams with tools designed to keep
                everyone in sync.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
