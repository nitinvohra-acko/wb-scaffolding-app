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
import React from 'react';

const LeftSection: React.FC<{ taskData: any }> = ({ taskData }) => {
  // if (!taskData) {
  //   return <p className="text-sm text-gray-500">Nothing to display</p>;
  // }

  return (
    <Card className="w-full md:w-1/4 border-r border-gray-300 p-4">
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

      <CardContent className="p-0 space-y-6">
        {/* Task Details */}
        <div>
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
        <Separator />

        {/* General Info */}
        <div>
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
        <Separator />

        {/* Existing ACKO Policy Details */}
        <div>
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
        <Separator />

        {/* Claims Details */}
        <div>
          <h4 className="text-base font-semibold mb-2">Claims details</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <strong>Health claim in past X years:</strong> No
            </li>
          </ul>
        </div>
        <Separator />

        {/* Actions */}
        <div className="space-y-2">
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
