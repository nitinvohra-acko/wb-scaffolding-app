'use client';

import MultiSelect1 from '../MultiSelectV1';
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

  const handleChange = (filterValue: string[]) => {
    const res = taskResponse?.filters?.map((f) => {
      if (f.field_name === filter.field_name) {
        return {
          ...filter,
          options: f.options.map((option) => ({
            ...option,
            is_selected: filterValue.includes(option.value),
          })),
        };
      }
      return f;
    });

    if (res) {
      hoist({
        ...(taskResponse as TaskResponse),
        filters: res as FilterField[],
      });
    }
  };

  return (
    <div>
      <MultiSelect1
        label={filter?.field_name}
        options={filter?.options}
        value={
          filter?.options
            ?.filter((f) => f.is_selected)
            ?.map((f) => f.value) as string[]
        }
        onChange={handleChange}
      />
    </div>
  );
};

export default Index;
