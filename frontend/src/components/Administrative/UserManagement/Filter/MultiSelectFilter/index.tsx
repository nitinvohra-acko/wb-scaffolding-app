'use client';

import MultiSelect1 from '../MultiSelectV1';
import { FC, useCallback, useMemo } from 'react';
import useTasks from '@/store/tasklist';
import { FilterField, TaskResponse } from '@/types/task';
import { useShallow } from 'zustand/shallow';
import useUsersStore from '@/store/users';

interface Props {
  filter: FilterField;
}

const Index: FC<Props> = ({ filter }) => {
  const { usersResponse, hoist } = useUsersStore(
    useShallow((store) => ({
      usersResponse: store.usersResponse,
      hoist: store.hoist,
    })),
  );

  const handleChange = (filterValue: string[]) => {
    const res = usersResponse?.filters?.map((f) => {
      if (f.fieldName === filter.fieldName) {
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
        ...(usersResponse as TaskResponse),
        filters: res as FilterField[],
      });
    }
  };

  return (
    <div>
      <MultiSelect1
        label={filter?.fieldName}
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
