import React, { useState } from 'react';
import useTasksDetail from '@/store/taskDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskDetail as TaskDetailType } from '@/types/task';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import { TaskAssignment } from '@/components/Widgets/task-assigment';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const TaskDetail: React.FC = () => {
  const { taskDetail } = useTasksDetail.getState();
  const [openAssignee, setOpenAssignee] = useState(false);

  const TaskDetailData = [
    {
      label: 'Type',
      value: taskDetail?.type,
    },
    {
      label: 'Priority',
      value: taskDetail?.priority,
    },
    {
      label: 'Tags',
      value: taskDetail?.tags,
      component: () => (
        <div className="flex flex-end gap-2 w-100">
          <Badge
            variant="outline"
            className={'bg-orange-50 text-orange-500 border-orange-200'}
          >
            {taskDetail?.tags[0].label}
          </Badge>
          <Badge
            variant="outline"
            className={'bg-orange-50 text-orange-500 border-orange-200'}
          >
            {taskDetail?.tags[0].level}
          </Badge>
        </div>
      ),
    },
    {
      label: 'Updated Date',
      value: taskDetail?.updatedDate
        ? moment(taskDetail?.updatedDate).format('DD/MM/YYYY HH:mm')
        : '',
    },
    {
      label: 'Created Date',
      value: taskDetail?.createdDate
        ? moment(taskDetail?.updatedDate).format('DD/MM/YYYY HH:mm')
        : '',
    },
    {
      label: 'Assignee',
      value: taskDetail?.assignee,
      component: () => (
        <div className="flex gap-2 items-center">
          <span className="text-sm">{taskDetail?.assignee}</span>
          <Edit
            size={15}
            className="text-gray-900 cursor-pointer"
            onClick={() => setOpenAssignee(true)}
          />
        </div>
      ),
    },
  ];

  const renderDataItems = (taskDetail: TaskDetailType | null) => {
    if (!taskDetail) return <></>;

    return (
      <>
        {TaskDetailData.map((item, index) => {
          if (!item.value) {
            return <></>;
          }
          if (item.component) {
            return (
              <div key={index} className="flex gap-2 justify-between">
                <div className="text-sm">{item.label}</div>
                {item.component && React.createElement(item.component, {})}
              </div>
            );
          }
          if (Array.isArray(item.value)) {
            return (
              <div key={index} className="flex gap-2 justify-between">
                <div className="text-sm">{item.label}</div>

                {/* <span className="ml-auto text-sm">{item.value}</span> */}
              </div>
            );
          }
          return (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm">{item.label}</span>
              <span className="ml-auto text-sm">{item.value}</span>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Task detail</CardTitle>
            <button className="text-gray-500"></button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">{renderDataItems(taskDetail)}</div>
        </CardContent>
      </Card>
      {openAssignee && (
        <Dialog
          open={openAssignee}
          onOpenChange={(open) => !open && setOpenAssignee(false)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <TaskAssignment
              taskId=""
              closeWidget={() => {
                setOpenAssignee(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TaskDetail;
