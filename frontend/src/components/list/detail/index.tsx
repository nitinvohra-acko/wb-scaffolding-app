import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LeftSection from './Overview';
import RightSection from './tabs';
import { userDataList, DataRow } from '../constants';
import { useParams } from 'next/navigation';
import { apiClient } from '@/utils/interceptor';

const PageLayout: React.FC<{ pageId: string[] }> = ({ pageId }) => {
  const params = useParams();
  console.log('params', params);
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <LeftSection taskData={taskDetail} />
      <RightSection />
    </Box>
  );
};

export default PageLayout;
