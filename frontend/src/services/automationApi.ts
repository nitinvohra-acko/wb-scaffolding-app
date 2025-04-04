import { AutomationEventPayload } from '@/types/automationRule';
import { apiClient } from '@/utils/interceptor';

export const fetchAutomationMetadata = async () => {
  try {
    const response = await apiClient('/action/metadata', 'GET');

    const data = await response;
    return data;
  } catch (error) {
    console.error('Error fetching automation metadata:', error);
    throw error;
  }
};
export const createAutomationRule = async (payload: AutomationEventPayload) => {
  try {
    const response = await apiClient('/action/save', 'POST', {
      body: payload,
    });

    const data = await response;
    return data;
  } catch (error) {
    console.error('Error fetching automation metadata:', error);
    throw error;
  }
};
