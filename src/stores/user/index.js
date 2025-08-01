import { create } from 'zustand';
import sagaMiddleware from 'zustand-saga';
import { userSaga } from './effects';
import { actions } from './actions';

const useUserStore = create(
  sagaMiddleware(userSaga, (set, get, store) => {
    const dispatchableActions = {
      fetchProfile: (payload) => store.putActionToSaga(actions.fetchProfile(payload)),
    };

    return {
      isLoading: true,
      error: null,
      ...dispatchableActions,
    };
  })
);

export default useUserStore;