'use client';

import { Phone, FileText, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ReactNode } from 'react';

// Define the data structure
interface DataItem {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
  category: string;
  badge?: {
    text: string;
    variant: 'default' | 'outline';
    className?: string;
  };
}

interface MemberItem {
  name: string;
  details: string;
  status: string;
  statusClassName: string;
}

export default function CustomerDashboard({
  layout,
  taskDetail,
}: {
  layout: 'horizontal' | 'vertical';
  taskDetail: any;
}) {
  // Customer profile data
  const customerData = {
    name: 'Rahul',
    proposalNo: '31791797',
    avatar: 'AB',
    status: taskDetail?.status,
  };

  // Plan details data
  const planDetailsData: DataItem[] = [
    {
      label: 'Plan',
      value: 'Platinum Base',
      icon: (
        <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
      ),
      category: 'Plan details',
      badge: {
        text: 'Platinum Base',
        variant: 'outline',
        className:
          'bg-green-50 text-green-700 border-green-200 rounded-full px-3',
      },
    },
    {
      label: 'Sum Insured',
      value: '1 cr',
      icon: (
        <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
      ),
      category: 'Plan details',
    },
    {
      label: 'Cohort',
      value: 'Solicited ACKO customer',
      icon: (
        <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
      ),
      category: 'Plan details',
    },
    {
      label: 'Proposal type',
      value: 'Fresh',
      icon: (
        <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
      ),
      category: 'Plan details',
    },
    {
      label: 'Repeat purchase',
      value: '59 days ago',
      icon: (
        <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
      ),
      category: 'Plan details',
    },
  ];

  // Member level details data
  const memberDetailsData: MemberItem[] = [
    {
      name: 'Rahul',
      details: 'Self | Male | 40 years',
      status: 'Tele-mer pending',
      statusClassName: 'bg-orange-50 text-orange-500 border-orange-200',
    },
    {
      name: 'Smita',
      details: 'Spouse | Female | 39 years',
      status: 'Tele-mer pending',
      statusClassName: 'bg-orange-50 text-orange-500 border-orange-200',
    },
  ];

  // Existing policy details data
  const policyDetailsData: DataItem[] = [
    {
      label: 'GMC customer',
      value: 'Yes',
      icon: <div className="w-4 h-4 rounded-full bg-blue-500"></div>,
      category: 'Existing ACKO policy details',
    },
    {
      label: 'Car customer',
      value: 'Yes',
      icon: <div className="w-4 h-4 rounded-full bg-blue-500"></div>,
      category: 'Existing ACKO policy details',
    },
  ];

  // Quick actions data
  const quickActionsData: DataItem[] = [
    {
      label: 'Payment history',
      value: <FileText size={16} className="text-blue-600" />,
      icon: <FileText size={14} className="text-green-600" />,
      category: 'Quick actions',
    },
    {
      label: 'Communication history',
      value: <FileText size={16} className="text-blue-600" />,
      icon: <MessageSquare size={14} className="text-blue-600" />,
      category: 'Quick actions',
    },
  ];

  // Call status data
  const callData = {
    name: 'Akash Bhatia',
    language: 'English',
    duration: '01 min 30 sec',
  };

  // Function to render data items
  const renderDataItems = (items: DataItem[]) => {
    return items.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        {item.icon && (
          <div
            className={`w-6 h-6 ${
              item.category === 'Quick actions' ? 'bg-blue-100' : ''
            } ${
              item.label === 'Payment history' ? 'bg-green-100' : ''
            } rounded-full flex items-center justify-center`}
          >
            {item.icon}
          </div>
        )}
        <span className="text-sm">{item.label}</span>
        {item.badge ? (
          <Badge variant={item.badge.variant} className={item.badge.className}>
            {item.badge.text}
          </Badge>
        ) : (
          <span className="ml-auto text-sm">{item.value}</span>
        )}
      </div>
    ));
  };
  console.log('layout', layout);
  return (
    <div
      className={
        layout === 'horizontal'
          ? ' bg-white p-4 w-1/4'
          : 'w-full width: bg-white p-4'
      }
      style={{ background: '#F2F2FDFF' }}
    >
      <div
        className={
          layout === 'horizontal'
            ? 'flex flex-col  gap-4'
            : 'flex flex-row  gap-4'
        }
      >
        {/* Customer Profile Section */}
        <div className="flex items-start gap-4 min-w-[200px]">
          <Avatar className="h-14 w-14 bg-blue-500 text-white">
            <AvatarFallback>{customerData.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{customerData.name}</h2>
            <p className="text-sm text-gray-600">
              Proposal no: {customerData.proposalNo}
            </p>
            <p className="text-sm text-gray-600">
              Status: {customerData.status}
            </p>
          </div>
        </div>

        {/* Plan Details Section */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Plan details</CardTitle>
              <button className="text-gray-500">
                <FileText size={18} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">{renderDataItems(planDetailsData)}</div>
          </CardContent>
        </Card>

        {/* Member Level Details Section */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Member level details</CardTitle>
              <button className="text-gray-500">
                <FileText size={18} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {memberDetailsData.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.details}</p>
                  </div>
                  <Badge variant="outline" className={member.statusClassName}>
                    {member.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Existing Policy Details Section */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Existing ACKO policy details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {renderDataItems(policyDetailsData)}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions and Call Section */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {renderDataItems(quickActionsData)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">In call with {callData.name}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <p>Language: {callData.language}</p>
                      <p>{callData.duration}</p>
                    </div>
                    <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
