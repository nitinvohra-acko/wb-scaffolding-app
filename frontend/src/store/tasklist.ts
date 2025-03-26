import { FilterFields } from '@/types/common';
import { TaskRequest, TaskResponse } from '@/types/task';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  taskResponse: TaskResponse | null;
  taskRequest: TaskRequest | null;
  initFilters: FilterFields[] | null;
  status: 'success' | 'loading' | 'error';
}

const initState: StateType = {
  taskResponse: null,
  status: 'success',
  taskRequest: null,
  initFilters: null,
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (taskResponse: StateType['taskResponse']) => {
    set({ taskResponse });
  };
const hoistInitFilters =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (initFilters: StateType['initFilters']) => {
    set({ initFilters });
  };
const setStatus =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (status: StateType['status']) => {
    set({ status });
  };
const useTasks = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
      hoistInitFilters: hoistInitFilters(set, get),
      setStatus: setStatus(set, get),
    })),
  ),
);

export default useTasks;
