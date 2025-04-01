import { UserInfo } from '@/types/auth';
import { User } from '@/types/users';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  authUser: UserInfo | null;
}

const initState: StateType = {
  authUser: null,
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (authUser: StateType['authUser']) => {
    set({ authUser });
  };

const useAuthStore = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
    })),
  ),
);

export default useAuthStore;
