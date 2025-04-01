import { User } from '@/types/users';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';

const useUserDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const response: User = await apiClient(`/api/user/${userId}`, 'GET');
      return response;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    fetchUser,
    loading,
  };
};

export default useUserDetail;
