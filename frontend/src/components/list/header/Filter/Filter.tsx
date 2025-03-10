'use client';

import React, { FC, useMemo } from 'react';
import FilterComponents from './WidgetType';
import useTasks from '@/store/tasklist';

const Filter: FC<{
  isExpandFilter?: boolean;
  handleExpand?: (expand: boolean) => void;
}> = ({ isExpandFilter, handleExpand }) => {
  const { taskResponse } = useTasks.getState();

  const RenderFilters = useMemo(() => {
    return taskResponse?.filters?.map((filter) => {
      const Component = FilterComponents[filter?.field_type];
      if (Component) {
        return <Component key={filter.field_name} filter={filter} />;
      }
      return null;
    });
  }, [taskResponse]);

  return <div className="space-y-4">{RenderFilters}</div>;
};

export default Filter;
