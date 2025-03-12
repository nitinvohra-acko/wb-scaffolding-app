import Cookies from 'js-cookie';
import getCookie from './getCookies';
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions<T = unknown> {
  body?: T; // Request payload (optional)
  customHeaders?: Record<string, string>; // Additional headers (optional)
}

export async function apiClient<TResponse, TBody = unknown>(
  url: string,
  method: RequestMethod,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  try {
    const token = await getCookie('access_token'); //Cookies.get('access_token');
    const { body, customHeaders } = options;
    console.log(token, 'token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
  } catch (error) {
    console.error(`API ${method} request failed:`, error);
    throw error;
  }
}
