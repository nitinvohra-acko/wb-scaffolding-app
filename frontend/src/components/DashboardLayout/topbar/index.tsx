"use client";



import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { FC, useCallback, useMemo } from "react";



interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 200;
const Index: FC<{ open: boolean; handleDrawerOpen: () => void }> = ({
  open,
  handleDrawerOpen,
}) => {

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: "white",
    color:'#040222',
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
const path = usePathname()
  return (
    <AppBar position="fixed" open={open}>
        <Toolbar>
        <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ops Tech Tool
          </Typography>
         
          {!path.includes('/login')&&<Button color="inherit" href="/api/auth/logout">
            Logout
          </Button>}
        </Toolbar>
    </AppBar>
  );
};

export default Index;
