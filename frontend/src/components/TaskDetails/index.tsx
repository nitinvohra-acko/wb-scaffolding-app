'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DataRow } from './constants';
import LeftSection from './Overview';
import RightSection from './tabs';
import useTaskDetail from '@/hooks/useTaskDetails';
import useTasksDetail from '@/store/taskDetails';
import { withRBAC } from '../withRBAC';

const TaskDetails: React.FC = ({}) => {
  const params = useParams();
  const hoist = useTasksDetail().hoist;
  const fetchTaskDetail = useTaskDetail().fetchTaskDetail;

  useEffect(() => {
    if (Array.isArray(params.slug) && params.slug.length > 0) {
      fetchTaskDetail(params.slug[0]);
    }
    return () => {
      hoist(null);
    };
  }, []);

  return (
    <div className="flex h-full">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default withRBAC(TaskDetails, 'task-details:view', () => (
  <div className="p-4 text-center">
    You don't have permission to view the task details.
  </div>
));
