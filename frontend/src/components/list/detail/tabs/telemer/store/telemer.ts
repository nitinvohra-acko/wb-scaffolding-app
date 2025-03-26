import { QuestionsType } from '../detail/type';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  questionConfig: QuestionsType[];
  memberResponse: any;
}

const initState: StateType = {
  questionConfig: [],
  memberResponse: null,
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (questionConfig: StateType['questionConfig']) => {
    set({ questionConfig });
  };

const useTelemer = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
    })),
  ),
);

export default useTelemer;
