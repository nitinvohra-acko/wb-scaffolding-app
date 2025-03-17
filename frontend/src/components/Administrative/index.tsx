'use client';

import { Activity, Filter, LayoutDashboard, Users } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

const categories: Record<
  string,
  { name: string; description: string; url?: string; icon: ReactNode }
> = {
  'service-status': {
    name: 'Services health status',
    description: 'Search through our proposals catalog',
    icon: <Activity className="h-5 w-5" />,
  },
  users: {
    name: 'User management',
    description: 'Find customer policy and take action',
    icon: <Users className="h-5 w-5" />,
  },
  'entity-config': {
    name: 'Filter config',
    description: 'Search for users and its associated data',
    icon: <Filter className="h-5 w-5" />,
  },
  dashboard: {
    name: 'Dashboard',
    description: 'Search for PPMC assessments',
    url: process.env.NEXT_PUBLIC_KIBANA_HEALTH + '/app/dashboards',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
};

const featureList: string[] = [
  'service-status',
  'users',
  'entity-config',
  'dashboard',
];

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (key: string, url?: string) => {
    window?.open(url ? url : `/administrative/${key}`, url && '_blank');
  };

  return (
    <div className="min-h-[95vh] flex items-center bg-[radial-gradient(70%_70%_at_20%_20%,rgba(103,77,226,0.27)_0%,rgba(176,159,242,0.06)_100%)] -m-5 pb-10">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            What are you <span className="text-[#752cff]">looking</span> for?
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {Object.entries(categories).map(([key, category]) =>
            featureList.includes(key) ? (
              <Link
                key={key}
                href={category.url ? category.url : `/administrative/${key}`}
                target={category.url && '_blank'}
              >
                <div
                  key={key}
                  // onClick={() => handleCategoryClick(key, category.url)}
                  className={`flex items-center rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg transform ${
                    selectedCategory === key
                      ? 'scale-105 bg-[#752cff] text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <span className="mr-2">{category?.icon}</span>
                  <h2 className="text-xl font-semibold mb-1">
                    {category.name}
                  </h2>
                  {/* <p className="text-sm">{category.description}</p> */}
                </div>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
