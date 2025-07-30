import { create } from 'zustand';
import { takeLatest, select, call, put, fork } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';
import { syncChats, syncAcknowledge, clearHistory, pinChats } from '../api/apiService';
import { getImageUrl } from '../utils/imageUtils';
import { Alert } from 'react-native';

const FETCH_CHATS = 'FETCH_CHATS';
const DELETE_CHATS = 'DELETE_CHATS';
const TOGGLE_PIN_CHAT = 'TOGGLE_PIN_CHAT';
const WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';

function* fetchChatsSaga(action) {
    const syncType = action.payload?.syncType || 1;
    if (syncType === 1) {
        yield setState({ isLoading: true, error: null });
    }
    try {
        const response = yield call(syncChats, syncType);
        if (response.data.status === 'success') {
            if (response.data.update_message_id) {
                yield fork(syncAcknowledge, response.data.update_message_id);
            }
            const { updates, pinned_chats = [] } = response.data;
            const pinnedIds = new Set(pinned_chats);
            const chatsArray = updates ? Object.keys(updates).map(key => {
                const chatData = updates[key];
                const lastMessageItem = chatData.sort((a,b) => b.date - a.date).find(item => item.message_id);
                const chatInfo = chatData.find(item => item.chat_type !== undefined);
                return {
                  id: key,
                  name: chatInfo?.chat_name || 'چت ناشناس',
                  lastMessage: lastMessageItem?.body || '...',
                  time: lastMessageItem ? new Date(lastMessageItem.date * 1000).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : '',
                  unreadCount: chatInfo?.unread_messages || 0,
                  avatarUrl: getImageUrl(chatInfo?.chat_image_server_id, chatInfo?.chat_image_path),
                  otherPartyId: chatInfo?.other_party_id || null,
                  pinned: pinnedIds.has(key),
                };
            }) : [];
            const sorted = chatsArray.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
            yield setState({ chats: sorted, isLoading: false });
        } else {
            throw new Error(response.data.reason || 'خطای سرور');
        }
    } catch (error) {
        yield setState({ error: error.message, isLoading: false });
    }
}

function* deleteChatsSaga(action) {
    const { chatIds } = action.payload;
    if (!chatIds || chatIds.length === 0) return;
    try {
        const response = yield call(clearHistory, chatIds);
        if (response.data.status === 'success') {
            yield setState(state => ({
                chats: state.chats.filter(chat => !chatIds.includes(chat.id)),
            }));
        } else {
            throw new Error(response.data.reason);
        }
    } catch (error) {
        yield setState({ error: error.message });
    }
}

function* pinChatSaga(action) {
    const { chatId } = action.payload;
    const initialChats = yield select(state => state.chats);

    const newChats = initialChats.map(chat => 
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
    );
    yield setState({ chats: newChats.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) });
    
    try {
        const pinnedChatIds = newChats.filter(c => c.pinned).map(c => c.id);
        const response = yield call(pinChats, pinnedChatIds);
        if (response.data.status !== 'success') {
            throw new Error(response.data.reason);
        }
    } catch (error) {
        Alert.alert('خطا', `عملیات پین کردن ناموفق بود: ${error.message}`);
        yield setState({ chats: initialChats });
    }
}

function* handleWebSocketMessage() {
    yield call(fetchChatsSaga, { payload: { syncType: 2 } });
}

function* saga() {
    yield takeLatest(FETCH_CHATS, fetchChatsSaga);
    yield takeLatest(DELETE_CHATS, deleteChatsSaga);
    yield takeLatest(TOGGLE_PIN_CHAT, pinChatSaga);
    yield takeLatest(WEBSOCKET_MESSAGE_RECEIVED, handleWebSocketMessage);
}

const useChatStore = create(
  sagaMiddleware(saga, (set, get, store) => ({
      chats: [],
      isLoading: true,
      error: null,
      fetchChats: (payload) => store.putActionToSaga({ type: FETCH_CHATS, payload }),
      deleteChats: (payload) => store.putActionToSaga({ type: DELETE_CHATS, payload }),
      togglePinChat: (payload) => store.putActionToSaga({ type: TOGGLE_PIN_CHAT, payload }),
      websocketMessageReceived: (payload) => store.putActionToSaga({ type: WEBSOCKET_MESSAGE_RECEIVED, payload }),
  }))
);

export default useChatStore;