import { useCallback } from 'react';
import { analyticsService, AnalyticsEvent } from '../services/analytics';
import useAuthStore from '@/store/auth';

export const useAnalytics = () => {
  const { authUser: user } = useAuthStore();
  const track = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      const event: AnalyticsEvent = {
        eventName,
        properties,
        userId: user?.name || user?.email,
      };
      analyticsService.track(event);
    },
    [user],
  );

  const page = useCallback(
    (pageName: string, properties?: Record<string, any>) => {
      analyticsService.page(pageName, {
        ...properties,
        userId: user?.name || user?.email,
      });
    },
    [user],
  );

  const identify = useCallback(
    (traits?: Record<string, any>) => {
      if (user?.email) {
        analyticsService.identify(user?.name || user.email || '', {
          ...traits,
          email: user.email,
          name: user.name,
        });
      }
    },
    [user],
  );

  return { track, page, identify };
};
