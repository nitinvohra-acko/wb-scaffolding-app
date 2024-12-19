import { createTheme } from "@mui/material/styles";

// Define the light theme
const lightTheme = createTheme({
  palette: {
    mode: "light", // Explicitly set light mode
    primary: {
      main: "#2563eb", // Matches Tailwind's blue-600
    },
    secondary: {
      main: "#d97706", // Matches Tailwind's amber-600
    },
    background: {
      default: "#f9fafb", // Matches Tailwind's gray-100
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "Inter", // Matches Tailwind's default font
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Matches Tailwind's default text style
          borderRadius: "0.5rem", // Matches Tailwind's rounded-md
        },
      },
    },
  },
});

// Define the dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Explicitly set dark mode
    primary: {
      main: "#2563eb", // Matches Tailwind's blue-600
    },
    secondary: {
      main: "#d97706", // Matches Tailwind's amber-600
    },
    background: {
      default: "#121212", // Typical dark mode background
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Inter", // Matches Tailwind's default font
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Matches Tailwind's default text style
          borderRadius: "0.5rem", // Matches Tailwind's rounded-md
        },
      },
    },
  },
});

// Export both themes for dynamic use
export { lightTheme, darkTheme };
