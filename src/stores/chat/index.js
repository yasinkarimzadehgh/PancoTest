import { create } from 'zustand';
import sagaMiddleware from 'zustand-saga';
import { chatSaga } from './effects';
import { actions } from './actions';

const useChatStore = create(
  sagaMiddleware(chatSaga, (set, get, store) => {
    const dispatchableActions = {
      fetchChats: (payload) => store.putActionToSaga(actions.fetchChats(payload)),
      deleteChats: (payload) => store.putActionToSaga(actions.deleteChats(payload)),
      togglePinChat: (payload) => store.putActionToSaga(actions.togglePinChat(payload)),
      websocketMessageReceived: (payload) => store.putActionToSaga(actions.websocketMessageReceived(payload)),
    };

    return {
      isLoading: true,
      error: null,
      ...dispatchableActions,
    };
  })
);

export default useChatStore;