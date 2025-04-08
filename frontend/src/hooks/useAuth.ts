'use client';

import useAuthStore from '@/store/auth';
import useUsersStore from '@/store/users';
import { AuthData, UserInfo } from '@/types/auth';
import { User, UsersRequest, UsersResponse } from '@/types/users';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';
import { useUserPermissions } from './useUserPermissions';

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { hoist } = useAuthStore();
  const { fetchRoleToPermissions } = useUserPermissions();
  const fetchAuthDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response: AuthData = await apiClient(`/api/user/token/info`, 'GET');
      if (response) {
        if (response?.userInfo?.role) {
          fetchRoleToPermissions(response.userInfo.role);
        }

        hoist((response as AuthData)?.userInfo as UserInfo);
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
  };
};

export default useAuth;
