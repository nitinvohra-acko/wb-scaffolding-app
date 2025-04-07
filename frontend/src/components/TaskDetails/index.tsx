'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LeftSection from './Overview/horizontal';
import RightSection from './tabs';
import useTaskDetail from '@/hooks/useTaskDetails';
import useTasksDetail from '@/store/taskDetails';
import { withRBAC } from '../withRBAC';
import WidgetSpeedModal from '../Widgets/speed-dial/layout';

const TaskDetails: React.FC = ({}) => {
  const params = useParams();
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('horizontal');
  const { hoist, taskDetail } = useTasksDetail.getState();
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
    <div className={`${layout === 'horizontal' ? 'flex' : ''} h-full`}>
      <LeftSection taskDetail={taskDetail} layout={layout} />
      <RightSection
        layout={layout}
        handleLayout={setLayout}
        taskDetail={taskDetail}
      />
      <WidgetSpeedModal itemId={params?.slug ? params?.slug[0] : ''} />
    </div>
  );
};
export default TaskDetails;
// export default withRBAC(TaskDetails, 'task-details:view', () => (
//   <div className="p-4 text-center">
//     You don't have permission to view the task details.
//   </div>
// ));
