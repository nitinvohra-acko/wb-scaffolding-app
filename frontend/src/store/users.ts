import { FilterField } from '@/types/common';
import { UsersRequest, UsersResponse } from '@/types/users';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  usersResponse: UsersResponse | null;
  usersRequest: UsersRequest | null;
  initFilters: FilterField[] | null;
  status: 'success' | 'loading' | 'error';
}

const initState: StateType = {
  usersResponse: null,
  status: 'success',
  usersRequest: null,
  initFilters: null,
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (usersResponse: StateType['usersResponse']) => {
    set({ usersResponse });
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
const useUsersStore = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
      hoistInitFilters: hoistInitFilters(set, get),
      setStatus: setStatus(set, get),
    })),
  ),
);

export default useUsersStore;
