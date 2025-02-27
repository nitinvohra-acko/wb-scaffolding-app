'use client';
import MultiSelect1 from '../MultiSelectV1';
import { Box } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import useTasks from '@/store/tasklist';
import { FilterField, TaskResponse } from '@/types/task';
import { useShallow } from 'zustand/shallow';
interface Props {
  filter: FilterField;
}
const Index: FC<Props> = ({ filter }) => {
  const { taskResponse, hoist } = useTasks(
    useShallow((store) => ({
      taskResponse: store.taskResponse,
      hoist: store.hoist,
    })),
  );
  const handleChange = (filterValue: any) => {
    const res = taskResponse?.filters?.map((f) => {
      if (f.field_name === filter.field_name) {
        return {
          ...filter,
          options: f.options.map((option) => {
            if (filterValue?.includes(option?.value)) {
              option.is_selected = true;
            } else {
              option.is_selected = false;
            }
            return option;
          }),
        };
      }
      return f;
    });

    if (res !== null) {
      hoist({
        ...(taskResponse as TaskResponse),
        filters: res as FilterField[],
      });
    }
  };

  return (
    <Box>
      <MultiSelect1
        label={filter?.field_name}
        options={filter?.options}
        value={
          filter?.options
            ?.filter((f) => f.is_selected)
            ?.map((f) => f.value) as Array<string>
        }
        onChange={handleChange}
      />
    </Box>
  );
};

export default Index;
