"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { darkTheme } from "../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}