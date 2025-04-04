'use client';
import { apiClient } from '@/utils/interceptor';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DataRow } from './constants';
import LeftSection from './Overview';
import RightSection from './tabs';
import { withRBAC } from '../withRBAC';

const TaskDetails: React.FC = ({}) => {
  const params = useParams();
  const [userData, setUserData] = useState<DataRow | undefined>();
  const [taskDetail, setTaskDetail] = useState(null);

  useEffect(() => {
    if (Array.isArray(params.slug) && params.slug.length > 0) {
      fetchTaskDetail(params.slug[0]);
    }
  }, []);

  const fetchTaskDetail = async (id: string) => {
    try {
      const response = await apiClient('/task/' + id, 'GET');

      setTaskDetail(response as any);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className="flex h-full">
      <LeftSection taskData={taskDetail} />
      <RightSection />
    </div>
  );
};

export default withRBAC(TaskDetails, 'task-details:view', () => (
  <div className="p-4 text-center">
    You don't have permission to view the task details.
  </div>
));
