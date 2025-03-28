'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Mail, Phone } from 'lucide-react';
import React, { useState } from 'react';
import CustomerDashboard from './horizontal';

const LeftSection: React.FC<{
  taskData: any;
  layout: 'vertical' | 'horizontal';
}> = ({ taskData, layout }) => {
  const [detail, setDetail] = useState([
    { label: 'Email', value: '' },
    { label: 'Phone', value: '' },
    { label: 'Name', value: '' },
    { label: 'Email', value: '' },
  ]);
  if (!taskData) {
    return <p className="text-sm text-gray-500">Nothing to display</p>;
  }
  console.log('taskDetail', taskData);
  return <CustomerDashboard layout={layout} taskDetail={taskData} />;
  return (
    <Card
      className={`w-full border-r border-gray-300 p-4 flex`}
      style={{ background: '#F2F2FDFF' }}
    >
      <CardHeader className="flex flex-row items-center space-x-4 p-0 mb-4">
        <Avatar className="bg-purple-700 text-white">
          <AvatarFallback>{taskData?.assignee?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{taskData?.assignee}</h3>
          <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </TooltipTrigger>
                <TooltipContent>Email</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>Phone</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={`${
          layout === 'horizontal'
            ? 'p-0 space-y-6 w-full'
            : ' flex p-0 space-y-6 w-full gap-2'
        }`}
      >
        {/* Task Details */}
        <div
          style={{ minWidth: '200px' }}
          className="border rounded-sm bg-white p-2"
        >
          <h4 className="text-base font-semibold mb-2">Task details</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <strong>Type:</strong> {taskData?.type}
            </li>
            <li>
              <strong>Status:</strong> {taskData?.status}
            </li>
            <li>
              <strong>Updated at:</strong> {taskData?.updated_date}
            </li>
            <li>
              <strong>Created at:</strong> {taskData?.created_at}
            </li>
            <li>
              <strong>Priority:</strong> {taskData?.priority}
            </li>
          </ul>
        </div>
        {/* <Separator orientation={layout} /> */}

        {/* General Info */}
        <div
          className="w-20 border rounded-sm bg-white p-2"
          style={{ minWidth: '200px' }}
        >
          <h4 className="text-base font-semibold mb-2">General info</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <strong>Language preference:</strong> Hindi
            </li>
            <li>
              <strong>SPOC:</strong> Dr. Sandeep Nair
            </li>
          </ul>
        </div>
        {/* <Separator orientation={layout} /> */}

        {/* Existing ACKO Policy Details */}
        <div
          style={{ minWidth: '200px' }}
          className="border rounded-sm bg-white p-2"
        >
          <h4 className="text-base font-semibold mb-2">
            Existing ACKO policy details
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <strong>GMC customer:</strong> Yes
            </li>
            <li>
              <strong>Auto customer (car):</strong> Yes
            </li>
            <li>
              <strong>Auto customer (bike):</strong> Yes
            </li>
            <li>
              <strong>Life customer:</strong> No
            </li>
          </ul>
        </div>
        {/* <Separator orientation={layout} /> */}

        {/* Claims Details */}
        <div
          style={{ minWidth: '200px' }}
          className="border rounded-sm bg-white p-2"
        >
          <h4 className="text-base font-semibold mb-2">Claims details</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <strong>Health claim in past X years:</strong> No
            </li>
          </ul>
        </div>
        {/* <Separator orientation={layout} /> */}

        {/* Actions */}
        <div className="space-y-2" style={{ minWidth: '200px' }}>
          <Button className="w-full">Plan change</Button>
          <Button variant="outline" className="w-full">
            Proposal edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeftSection;
/* Container 187 */
// .container {
//     position: absolute;
//     top: 82px;
//     left: 110px;
//     width: 1847px;
//     height: 176px;
//     background: #F2F2FDFF;
//     border-radius: 8px;
//   }
