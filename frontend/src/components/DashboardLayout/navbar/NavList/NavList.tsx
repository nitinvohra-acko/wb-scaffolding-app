"use client";
import {
  Avatar,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { retail } from "../config";


const NavList: FC<{ featuresList: string[] }> = ({ featuresList }) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <List>
      {retail?.items
        ?.filter((r) => featuresList?.includes(r.id))
        ?.map((ele, index) => {
          const IconRender = ele.icon;
          return (
            <Link href={(ele.href)} key={index}>
              <ListItem
                disablePadding
                style={{
                  background: `${
                    path.includes(ele.href) ? "rgb(239, 233, 251)" : "inherit"
                  }`,
                }}
              >
                <ListItemButton>
                  <Tooltip title={ele.title}>
                    <ListItemIcon>
                      <IconRender style={{ color: "#752cff" }} />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    primary={ele.title}
                    sx={{
                      marginLeft: "-15px",
                      color: "#282e33",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
    </List>
  );
};

export default NavList;
