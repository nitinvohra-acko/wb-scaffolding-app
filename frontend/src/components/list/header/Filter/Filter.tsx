'use client';

import React, { FC, useMemo } from 'react';
import FilterComponents from './WidgetType';
import useTasks from '@/store/tasklist';

const Filter: FC<{
  isExpandFilter?: boolean;
  handleExpand?: (expand: boolean) => void;
}> = ({ isExpandFilter, handleExpand }) => {
  const { taskResponse } = useTasks.getState();
  console.log(taskResponse?.filters, 'filters');
  const RenderFilters = useMemo(() => {
    return taskResponse?.filters?.map((filter) => {
      const Component = FilterComponents[filter?.fieldType];
      console.log(FilterComponents, filter?.fieldType);
      if (Component) {
        return <Component key={filter.fieldName} filter={filter} />;
      }
      return null;
    });
  }, [taskResponse]);

  return <div className="space-y-4">{RenderFilters}</div>;
};

export default Filter;
