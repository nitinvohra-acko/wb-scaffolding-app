import useTaskDetailStore from '@/store/taskDetails';
import { TaskDetail } from '@/types/task';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';

const useTaskDetail = () => {
  //   const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hoist = useTaskDetailStore().hoist;
  const fetchTaskDetail = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response: TaskDetail = await apiClient('/task/' + id, 'GET');
      hoist(response);
    } catch (err: any) {
      // setError(err.message || 'Something went wrong');
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchTaskDetail,
    loading,
  };
};

export default useTaskDetail;
