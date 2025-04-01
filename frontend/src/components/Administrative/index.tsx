'use client';

import {
  Activity,
  Filter,
  LayoutDashboard,
  Users,
  Workflow,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { withRBAC } from '../withRBAC';

const categories: Record<
  string,
  {
    name: string;
    description?: string;
    url?: string;
    icon: ReactNode;
    color: string;
    textColor: string;
  }
> = {
  'service-status': {
    name: 'Services health status',
    description: 'Monitor your service health metrics',
    icon: <Activity className="h-6 w-6" />,
    color:
      'from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10',
    textColor: 'text-blue-700',
  },
  users: {
    name: 'User management',
    description: 'Manage user access and roles',
    icon: <Users className="h-6 w-6" />,
    color:
      'from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10',
    textColor: 'text-purple-700',
  },
  'entity-config': {
    name: 'Filter config',
    description: 'Configure data filtering rules',
    icon: <Filter className="h-6 w-6" />,
    color:
      'from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10',
    textColor: 'text-green-700',
  },
  dashboard: {
    name: 'Configure Kibana Dashboard',
    description: 'Customize your analytics view',
    url: process.env.NEXT_PUBLIC_KIBANA_HEALTH + '/app/dashboards',
    icon: <LayoutDashboard className="h-6 w-6" />,
    color:
      'from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10',
    textColor: 'text-orange-700',
  },
  'automation-rules': {
    name: 'Automation Rules',
    description: 'Set up automated workflows',
    icon: <Workflow className="h-6 w-6" />,
    color:
      'from-red-500/10 to-red-500/5 hover:from-red-500/20 hover:to-red-500/10',
    textColor: 'text-red-700',
  },
  'role-permissions': {
    name: 'Role Permissions',
    description: 'Manage permissions for different roles',
    icon: <Shield className="h-6 w-6" />,
    color:
      'from-teal-500/10 to-teal-500/5 hover:from-teal-500/20 hover:to-teal-500/10',
    textColor: 'text-teal-700',
  },
};

const featureList: string[] = [
  'service-status',
  'users',
  'entity-config',
  'dashboard',
  'automation-rules',
  'role-permissions',
];

const AdministrativePage = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-4xl font-bold tracking-tight text-gray-900">
            What are you{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              looking
            </span>{' '}
            for?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our suite of administrative tools to manage your
            services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((key) => {
            const category = categories[key];
            const isHovered = hoveredCategory === key;

            return (
              <Link
                key={key}
                href={category.url ? category.url : `/administrative/${key}`}
                target={category.url ? '_blank' : undefined}
                className={`
                  block group relative overflow-hidden
                  rounded-2xl bg-gradient-to-br ${category.color}
                  transition-all duration-300 ease-out
                  transform hover:scale-[1.02] hover:shadow-xl
                `}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="p-8">
                  <div
                    className={`
                    ${category.textColor} 
                    rounded-full w-12 h-12 
                    flex items-center justify-center 
                    bg-white/80 backdrop-blur-sm
                    mb-4 transition-transform duration-300
                    group-hover:scale-110
                  `}
                  >
                    {category.icon}
                  </div>

                  <h2
                    className={`
                    text-xl font-semibold text-gray-900
                    mb-2 transition-transform duration-300
                    ${isHovered ? 'transform -translate-y-1' : ''}
                  `}
                  >
                    {category.name}
                  </h2>

                  <p
                    className={`
                    text-gray-600 transition-all duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-70'}
                  `}
                  >
                    {category.description}
                  </p>
                </div>

                <div
                  className={`
                  absolute inset-0 pointer-events-none
                  bg-gradient-to-br opacity-0
                  transition-opacity duration-300
                  ${category.color.replace('hover:', '')}
                  ${isHovered ? 'opacity-10' : ''}
                `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withRBAC(AdministrativePage, 'administrative:view');
