import { apiClient } from '@/utils/interceptor';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DataRow } from './constants';
import LeftSection from './Overview';
import RightSection from './tabs';

const PageLayout: React.FC<{ pageId: string[] }> = ({ pageId }) => {
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
      const response = await fetch('/task/' + id);
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resp = await response.json();
      console.log('resp', resp);
      setTaskDetail(resp);
    } catch (err) {
      console.log('error', err);
    }
  };
  console.log('taskDetail', taskDetail);
  return (
    <div className="flex h-full ">
      <LeftSection taskData={taskDetail} />
      <RightSection />
    </div>
  );
};

export default PageLayout;
