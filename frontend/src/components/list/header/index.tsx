import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { styled } from "@mui/system";

interface HeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onFilter: () => void;
  onSort: () => void;
}

const SearchInput = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  flexGrow: 1,
}));

const Header: React.FC<HeaderProps> = ({
  title,
  onSearch,
  onFilter,
  onSort,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box position="static" bgcolor={"background.paper"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, color: "primary.main" }}
        >
          {title}
        </Typography>

        <Box>
          <SearchInput
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <Tooltip title="Filter">
            <IconButton color="inherit" onClick={onFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort">
            <IconButton color="inherit" onClick={onSort}>
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
