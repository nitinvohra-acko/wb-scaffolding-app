import { withRBAC } from '@/components/withRBAC';
import Users from './Users';
import React from 'react';

const UserComponent = () => {
  return <Users />;
};

export default withRBAC(UserComponent, 'user.view', () => (
  <div className="p-4 text-center">
    You don't have permission to view the dashboard.
  </div>
));
