import { QuestionsType } from '../detail/type';
import { create, StoreApi } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface StateType {
  questionConfig: QuestionsType[];
  memberResponse: QuestionsType[];
  answers: any[];
}

const initState: StateType = {
  questionConfig: [],
  memberResponse: [],
  answers: [],
};

const hoist =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (questionConfig: StateType['questionConfig']) => {
    set({ questionConfig });
  };

const hoistResponse =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (memberResponse: StateType['memberResponse']) => {
    set({ memberResponse });
  };
const hoistAnswer =
  (
    set: StoreApi<StateType>['setState'],
    _get: StoreApi<StateType>['getState'],
  ) =>
  async (answers: any) => {
    set({ answers });
  };

const useTelemer = create(
  devtools(
    combine(initState, (set, get) => ({
      hoist: hoist(set, get),
      hoistResponse: hoistResponse(set, get),
      hoistAnswer: hoistAnswer(set, get),
    })),
  ),
);

export default useTelemer;
