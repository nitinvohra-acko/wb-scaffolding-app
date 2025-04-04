import { TaskDetail } from '@/types/task';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  taskDetail: TaskDetail | null;
}

const initState: StateType = {
  taskDetail: null,
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (taskDetail: StateType['taskDetail']) => {
    set({ taskDetail });
  };

const useTasksDetail = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
    })),
  ),
);

export default useTasksDetail;
