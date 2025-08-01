import { create } from 'zustand';
import sagaMiddleware from 'zustand-saga';
import { notificationSaga } from './effects';
import { actions } from './actions';

const useNotificationStore = create(
  sagaMiddleware(notificationSaga, (set, get, store) => ({
    registerDevice: () => store.putActionToSaga(actions.registerDevice()),
  }))
);

export default useNotificationStore;