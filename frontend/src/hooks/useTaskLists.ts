'use client';
import useTasks from '@/store/tasklist';
import { TaskRequest, TaskResponse } from '@/types/task';
import { apiClient } from '@/utils/interceptor';
import { useCallback, useState } from 'react';

const useTaskLists = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { hoist, setStatus } = useTasks.getState();
  const fetchTaskLists = useCallback(
    async (taskRequest?: TaskRequest, initialRequest?: boolean) => {
      try {
        setLoading(true);
        setStatus('loading');

        const response: TaskResponse = await apiClient(
          'search/proposal',
          'POST',
          {
            body: taskRequest,
          },
        );
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
    fetchTaskLists,
    loading,
  };
};

export default useTaskLists;
