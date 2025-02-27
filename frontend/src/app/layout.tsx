"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { darkTheme, lightTheme } from "../theme";
import DashboardLayout from "@/components/DashboardLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
             <DashboardLayout>
                {children}
                </DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}