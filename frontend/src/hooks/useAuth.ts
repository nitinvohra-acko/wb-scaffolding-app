'use client';

import useUsersStore from '@/store/users';
import { User, UsersRequest, UsersResponse } from '@/types/users';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<any>();
  const fetchAuthDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response: User = await apiClient(`/api/user/token/info`, 'GET');
      if (response) {
        setTokenDetails(response);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    fetchAuthDetails,
    loading,
    tokenDetails,
  };
};

export default useAuth;
