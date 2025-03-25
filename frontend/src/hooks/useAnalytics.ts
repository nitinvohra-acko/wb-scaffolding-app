import { useCallback } from 'react';
import { analyticsService, AnalyticsEvent } from '../services/analytics';
import { useAuthStore } from '../store/useAuthStore';

export const useAnalytics = () => {
  const { user, isAuthenticated } = useAuthStore();

  const track = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      const event: AnalyticsEvent = {
        eventName,
        properties,
        userId: user?.preferred_username || user?.email,
      };
      analyticsService.track(event);
    },
    [user],
  );

  const page = useCallback(
    (pageName: string, properties?: Record<string, any>) => {
      analyticsService.page(pageName, {
        ...properties,
        userId: user?.preferred_username || user?.email,
      });
    },
    [user],
  );

  const identify = useCallback(
    (traits?: Record<string, any>) => {
      if (user && isAuthenticated) {
        analyticsService.identify(user.preferred_username || user.email || '', {
          ...traits,
          email: user.email,
          name: user.name,
        });
      }
    },
    [user, isAuthenticated],
  );

  return { track, page, identify };
};
