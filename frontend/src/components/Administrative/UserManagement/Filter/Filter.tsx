'use client';

import React, { FC, useMemo } from 'react';
import FilterComponents from './WidgetType';
import useTasks from '@/store/tasklist';
import useUsersStore from '@/store/users';

const Filter: FC<{
  isExpandFilter?: boolean;
  handleExpand?: (expand: boolean) => void;
}> = ({ isExpandFilter, handleExpand }) => {
  const { usersResponse } = useUsersStore.getState();

  const RenderFilters = useMemo(() => {
    return usersResponse?.filters?.map((filter) => {
      const Component = FilterComponents[filter?.fieldType];
      if (Component) {
        return <Component key={filter.fieldName} filter={filter} />;
      }
      return null;
    });
  }, [usersResponse]);

  return <div className="space-y-4">{RenderFilters}</div>;
};

export default Filter;
