'use client';

import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { fetchAuthDetails, loading, error } = useAuth();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (path !== '/login') {
      fetchAuthDetails(); // Fetch user info at the start of the application
    }
  }, [fetchAuthDetails]);
  if (path === '/login') {
    return <>{children}</>;
  }
  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user info
  }

  if (error) {
    console.error('Error fetching auth details:', error);
    router.push('/login');
  }

  return <>{children}</>;
};

export default AuthInitializer;
