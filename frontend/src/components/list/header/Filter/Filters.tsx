import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Drawer,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import DoneIcon from '@mui/icons-material/Done';
import useTasks from '@/store/tasklist';
import Filter from './Filter';

export const Filters = () => {
  const { taskResponse } = useTasks.getState();
  const [isExpandFilter, setExpandFilter] = useState(false);
  const handleApply = () => {};
  const handleClear = () => {};
  const onFilter = () => {
    setExpandFilter(true);
  };
  return (
    <>
      <Tooltip title="Filter">
        <IconButton color="inherit" onClick={onFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor={'right'}
        open={isExpandFilter}
        onClose={() => setExpandFilter(false)}
        sx={{ '.MuiDrawer-paper': { top: '70px' } }}
        // onOpen={() => setExpandFilter(true)}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 85px)',
            width: 400,
            borderRadius: 'none',
            boxShadow: 0,
            p: 1,
          }}
        >
          <CardHeader
            sx={{
              height: '10%',
              p: 0,
              '& > .MuiCardHeader-action': { m: 0, alignSelf: 'center' },
            }}
            title={
              <Box display={'flex'} alignItems={'center'}>
                {' '}
                <FilterAltIcon />
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  ml={1}
                  flex={1}
                >
                  Filters
                </Typography>
              </Box>
            }
            action={
              <IconButton
                sx={{
                  padding: 0,
                }}
                onClick={() => {
                  setExpandFilter(!Boolean(isExpandFilter));
                }}
              >
                <ExpandLessSharpIcon sx={{ rotate: '-90deg' }} />
              </IconButton>
            }
          ></CardHeader>
          {taskResponse?.filters ? (
            <>
              <CardContent sx={{ padding: 0, flex: 1, overflowY: 'auto' }}>
                <Filter />
              </CardContent>
              <CardActions
                sx={{
                  height: '10%',
                  justifyContent: 'end',
                  border: 'none',
                  boxShadow: 0,
                }}
              >
                <Button
                  variant="text"
                  onClick={handleClear}
                  sx={{
                    color: '#2874f0',
                    '&&:hover': {
                      boxShadow: 'none',
                      color: '#2874f0',
                      bgcolor: 'transparent',
                      border: 'none',
                    },
                  }}
                >
                  Clear all
                </Button>
                <Button
                  onClick={handleApply}
                  variant="contained"
                  sx={{
                    color: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 1px 4px 0 rgba(0,0,0,.3)',
                    backgroundColor: '#2874f0',
                    minWidth: '123px',
                    '&&:hover': {
                      boxShadow: '2',
                      bgcolor: '#2874f0',
                    },
                  }}
                  startIcon={<DoneIcon />}
                >
                  Apply
                </Button>
              </CardActions>
            </>
          ) : (
            <Box sx={{ m: 2 }}>
              <Skeleton
                variant="rectangular"
                width={'100%'}
                height={20}
                sx={{ my: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={'100%'}
                height={60}
                sx={{ my: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={'100%'}
                height={20}
                sx={{ my: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={'100%'}
                height={60}
                sx={{ my: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={'100%'}
                height={20}
                sx={{ my: 2 }}
              />
            </Box>
          )}
        </Card>
      </Drawer>
    </>
  );
};
