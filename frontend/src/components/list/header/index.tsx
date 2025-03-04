'use client';
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddOneIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/system';
import Filter from './Filter';
import Searching from './Searching';

interface HeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onFilter: () => void;
  onSort: () => void;
  handleNewTask: (data: any) => void;
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
  handleNewTask,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box position="static" bgcolor={'background.paper'}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, color: 'primary.main' }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Searching />
          <Filter />
          {/* <Tooltip title="Sort">
            <IconButton color="inherit" onClick={onSort}>
              <SortIcon />
            </IconButton>
          </Tooltip> */}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
