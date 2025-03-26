'use client';

import { createContext, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import useAuthStore from '@/store/auth';

export const AnalyticsContext = createContext({});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuthStore();
  const { identify } = useAnalytics();

  useEffect(() => {
    if (authUser?.email) {
      identify({
        email: authUser.email,
        name: authUser.name,
      });
    }
  }, [authUser, identify]);

  return <>{children}</>;
}
