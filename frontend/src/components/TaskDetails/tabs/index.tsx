'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Telemer from '@/components/TaskDetails/tabs/telemer';
interface PropsType {
  handleLayout: (l: 'vertical' | 'horizontal') => void;
  taskDetail: any;
}
const RightSection: React.FC<PropsType> = ({ handleLayout, taskDetail }) => {
  const [activeTab, setActiveTab] = React.useState('telemer');
  return (
    <div className="w-full  p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          {/* <TabsTrigger value="introduction">Introduction</TabsTrigger> */}
          <TabsTrigger value="telemer">Telemer</TabsTrigger>
          {/* <TabsTrigger value="medical">Medical details</TabsTrigger>
          <TabsTrigger value="endnote">End note</TabsTrigger> */}
        </TabsList>

        <TabsContent value="introduction">
          <div className="border border-gray-300 rounded-xl p-4 text-sm text-gray-700">
            Hi, I'm Dr. [Your Name] from Acko Health Insurance. Thank you for
            choosing us...
          </div>
        </TabsContent>

        <TabsContent value="telemer">
          {taskDetail?.status === 'in-progress' ? (
            <Telemer handleLayout={handleLayout} taskDetail={taskDetail} />
          ) : (
            <div className="font-bold text-green-700 ">
              Telemer form is completed
            </div>
          )}
        </TabsContent>

        {/* <TabsContent value="medical">
          <div className="border border-gray-300 rounded-xl p-4">Medical details content...</div>
        </TabsContent>

        <TabsContent value="endnote">
          <div className="border border-gray-300 rounded-xl p-4">End note content...</div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default RightSection;
