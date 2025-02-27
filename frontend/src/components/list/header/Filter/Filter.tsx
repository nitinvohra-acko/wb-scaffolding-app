// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import FilterComponents from './WidgetType';
import useTasks from '@/store/tasklist';

const Index: FC<{
  isExpandFilter?: boolean;
  handleExpand?: (expand: boolean) => void;
}> = ({ isExpandFilter, handleExpand }) => {
  const { taskResponse } = useTasks?.getState();
  // const [open, setOpen] = useState(true);
  const RenderFilters = useMemo(() => {
    return taskResponse?.filters?.map((filter) => {
      if (FilterComponents[filter?.field_type]) {
        return React.createElement(FilterComponents[filter.field_type], {
          filter,
          key: filter.field_name,
        });
      }
    });
  }, [taskResponse]);
  // console.log(taskResponse, 'task');

  return (
    <>
      <Box sx={{ '&>div': { margin: '10px 0' } }}>{RenderFilters}</Box>
    </>
  );
};
export default Index;
