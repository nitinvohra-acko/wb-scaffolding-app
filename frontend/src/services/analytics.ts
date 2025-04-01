import { channel } from 'diagnostics_channel';

export interface AnalyticsEvent {
  eventName?: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
  channel?: string;
  eventType: 'track' | 'page' | 'identify';
}

const safeFetch = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(`Analytics API failed with status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log('Analytics API error:', error);
    return null;
  }
};

export const analyticsService = {
  track: async (event: AnalyticsEvent) => {
    await safeFetch(`/api/event`, {
      ...event,
      channel: 'web',
      timestamp: event.timestamp || Date.now(),
    });
  },

  page: async (event: AnalyticsEvent) => {
    await safeFetch(`/api/event`, {
      ...event,
      channel: 'web',
      timestamp: Date.now(),
    });
  },

  identify: async (event: AnalyticsEvent) => {
    await safeFetch(`/api/event`, {
      ...event,
      channel: 'web',
      timestamp: Date.now(),
    });
  },
};
