'use client';

import { createContext, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAnalytics } from '@/hooks/useAnalytics';

export const AnalyticsContext = createContext({});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const { identify } = useAnalytics();

  useEffect(() => {
    if (isAuthenticated && user) {
      identify({
        email: user.email,
        name: user.name,
        preferred_username: user.preferred_username,
      });
    }
  }, [isAuthenticated, user, identify]);

  return <>{children}</>;
}
