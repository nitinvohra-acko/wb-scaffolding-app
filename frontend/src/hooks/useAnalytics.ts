import { useCallback } from 'react';
import { analyticsService, AnalyticsEvent } from '../services/analytics';
import useAuthStore from '@/store/auth';

export const useAnalytics = () => {
  const { authUser } = useAuthStore();
  const track = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      const event: AnalyticsEvent = {
        eventName,
        properties,
        userId: authUser?.id,
        eventType: 'track',
      };
      analyticsService.track(event);
    },
    [authUser],
  );

  const page = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      if (!authUser) return;
      console.log(authUser, 'user');
      const event: AnalyticsEvent = {
        eventName,
        properties,
        userId: authUser?.id,
        eventType: 'page',
      };
      analyticsService.page(event);
    },
    [authUser],
  );

  const identify = useCallback(
    (properties?: Record<string, any>) => {
      if (authUser?.email) {
        const event: AnalyticsEvent = {
          properties,
          userId: authUser?.id,
          eventName: 'identify',
          eventType: 'page',
        };
        analyticsService.identify(event);
      }
    },
    [authUser],
  );

  return { track, page, identify };
};
