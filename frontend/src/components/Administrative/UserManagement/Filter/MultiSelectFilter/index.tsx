'use client';

import MultiSelect1 from '../MultiSelectV1';
import { FC, useCallback, useMemo } from 'react';
import useTasks from '@/store/tasklist';
import { useShallow } from 'zustand/shallow';
import useUsersStore from '@/store/users';
import { UsersRequest, UsersResponse } from '@/types/users';
import { FilterField } from '@/types/common';

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
          options: f?.options?.map((option) => ({
            ...option,
            isSelected: filterValue.includes(option.value),
          })),
        };
      }
      return f;
    });

    if (res) {
      hoist({
        ...(usersResponse as UsersResponse),
        filters: res as FilterField[],
      });
    }
  };

  return (
    <div>
      <MultiSelect1
        label={filter?.fieldName}
        options={filter?.options ?? []}
        value={
          filter?.options
            ?.filter((f) => f.isSelected)
            ?.map((f) => f.value) as string[]
        }
        onChange={handleChange}
      />
    </div>
  );
};

export default Index;
