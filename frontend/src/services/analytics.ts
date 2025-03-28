const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
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
    await safeFetch(`${BASE_URL}/analytics/track`, {
      ...event,
      timestamp: event.timestamp || Date.now(),
    });
  },

  page: async (pageName: string, properties?: Record<string, any>) => {
    await safeFetch(`${BASE_URL}/analytics/page`, {
      pageName,
      properties,
      timestamp: Date.now(),
    });
  },

  identify: async (userId: string, traits?: Record<string, any>) => {
    await safeFetch(`${BASE_URL}/analytics/identify`, {
      userId,
      traits,
      timestamp: Date.now(),
    });
  },
};
