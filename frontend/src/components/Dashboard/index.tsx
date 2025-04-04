'use client';
import React from 'react';
import KibanaCustomDashboard from './KibanaCustomDashboard';
import { withRBAC } from '@/components/withRBAC';

const DashboardComponent = () => {
  return (
    <div>
      <KibanaCustomDashboard />
    </div>
  );
};

// Wrap with RBAC and export the protected component
export default withRBAC(DashboardComponent, 'dashboard:view', () => (
  <div className="p-4 text-center">
    You don't have permission to view the dashboard.
  </div>
));
