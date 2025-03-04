import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import {
  Box,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Tooltip,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import useTasks from '@/store/tasklist';
import { useShallow } from 'zustand/shallow';
import useTaskLists from '@/hooks/useTaskLists';
import { TaskRequest, TaskResponse } from '@/types/task';

const Index = () => {
  const { taskResponse, hoist, initFilters } = useTasks(
    useShallow((store) => ({
      taskResponse: store.taskResponse,
      hoist: store.hoist,
      initFilters: store.initFilters,
    })),
  );
  const { fetchTaskLists } = useTaskLists();
  const [searchStr, setSearchStr] = useState(taskResponse?.search_str ?? '');

  const handleQueryChange = (event: any): void => {
    event.persist();
    setSearchStr(event.target.value);
    if (event.key === 'Enter') {
      hoist({
        ...(taskResponse as TaskResponse),
        search_str: searchStr.trim() as string,
      });
      setTimeout(async () => {
        const req = {
          ...useTasks.getState().taskResponse,
        };
        req.filters = [];
        req.page_no = 1;
        delete req.result;
        await fetchTaskLists(req as TaskRequest);
      }, 100);
    }
  };
  const clearSearch = () => {
    setSearchStr('');
    hoist({
      ...(taskResponse as TaskResponse),
      search_str: '' as string,
    });
    setTimeout(async () => {
      const req = {
        ...useTasks.getState().taskResponse,
      };
      req.page_no = 1;
      delete req.result;
      await fetchTaskLists(req as TaskRequest);
    }, 100);
  };
  const searchableText = useMemo(() => {
    return taskResponse?.searchable_fields
      ?.map((fields) => fields?.field_display_name)
      ?.join(', ');
  }, [taskResponse]);
  return (
    <Box sx={{ display: 'flex', m: 1, flex: 1, mx: 2 }}>
      {taskResponse?.result?.length < 0 ? (
        <Skeleton
          variant="rectangular"
          width={'250px'}
          height={40}
          sx={{ my: 2 }}
        />
      ) : (
        <>
          <FormControl
            sx={{
              minWidth: '300px',
              bgcolor: 'white',
            }}
            size="small"
          >
            <InputLabel htmlFor="Search-Employeew">Search</InputLabel>
            <OutlinedInput
              label={`Search`}
              sx={{ background: 'white' }}
              id="Search-Employeew"
              type="text"
              value={searchStr}
              onChange={handleQueryChange}
              onKeyUp={handleQueryChange}
              endAdornment={
                searchStr ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={clearSearch}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <ClearSharpIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ''
                )
              }
              // labelWidth={130}
            />
          </FormControl>
          <Tooltip title={searchableText}>
            <Icon sx={{ cursor: 'pointer', height: '100%' }}>
              <InfoSharpIcon fontSize="small" color="info" />
            </Icon>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default Index;
