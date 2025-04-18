'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WidgetLayout from '@/components/Widgets/speed-dial/layout';
import { useParams } from 'next/navigation';

const RightSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('introduction');
  const params = useParams();
  return (
    <div className="w-full md:w-3/4 p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          {/* <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="medical">Medical details</TabsTrigger>
          <TabsTrigger value="endnote">End note</TabsTrigger> */}
        </TabsList>

        <TabsContent value="introduction">
          <div className="border border-gray-300 rounded-xl p-4 text-sm text-gray-700">
            Hi, I'm Dr. [Your Name] from Acko Health Insurance. Thank you for
            choosing us...
          </div>
        </TabsContent>

        {/* 
        <TabsContent value="demographics">
          <div className="border border-gray-300 rounded-xl p-4">Demographics content...</div>
        </TabsContent>

        <TabsContent value="medical">
          <div className="border border-gray-300 rounded-xl p-4">Medical details content...</div>
        </TabsContent>

        <TabsContent value="endnote">
          <div className="border border-gray-300 rounded-xl p-4">End note content...</div>
        </TabsContent>
        */}
      </Tabs>
      <WidgetLayout itemId={params?.slug?.[0]!} />
    </div>
  );
};

export default RightSection;
