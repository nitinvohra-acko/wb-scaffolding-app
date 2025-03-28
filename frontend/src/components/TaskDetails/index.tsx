'use client';
import { apiClient } from '@/utils/interceptor';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LeftSection from './Overview/horizontal';
import RightSection from './tabs';

const PageLayout: React.FC = ({}) => {
  const params = useParams();
  const [taskDetail, setTaskDetail] = useState(null);
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('horizontal');

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
    <div className={`${layout === 'horizontal' ? 'flex' : ''} h-full`}>
      <LeftSection taskDetail={taskDetail} layout={layout} />
      <RightSection
        layout={layout}
        handleLayout={setLayout}
        taskDetail={taskDetail}
      />
    </div>
  );
};

export default PageLayout;
