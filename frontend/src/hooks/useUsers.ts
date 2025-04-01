'use client';

import useUsersStore from '@/store/users';
import { UsersRequest, UsersResponse } from '@/types/users';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';

const useUsers = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { hoist, setStatus, hoistInitFilters } = useUsersStore?.getState();
  const fetchUsersLists = useCallback(
    async (usersRequest?: UsersRequest, initialRequest?: boolean) => {
      try {
        setLoading(true);
        setStatus('loading');

        const response: UsersResponse = await apiClient(
          '/api/user/search',
          'POST',
          {
            body: usersRequest,
          },
        );
        initialRequest && hoistInitFilters(response?.filters);
        hoist(response);
        setStatus('success');
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        setStatus('error');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    error,
    fetchUsersLists,
    loading,
  };
};

export default useUsers;
