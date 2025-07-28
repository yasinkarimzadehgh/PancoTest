import { call, put, takeLatest, fork, all, select } from 'redux-saga/effects';
import { syncChats, syncAcknowledge, clearHistory, pinChats } from '../api/apiService';
import useChatStore from './chatStore';
import { getImageUrl } from '../utils/imageUtils';
import { Alert } from 'react-native';

export const FETCH_CHATS = 'FETCH_CHATS';
export const DELETE_CHATS = 'DELETE_CHATS';
export const TOGGLE_PIN_CHAT = 'TOGGLE_PIN_CHAT';

function* fetchChatsSaga(action) {
  const { startLoading, setChats, setError } = useChatStore.getState();
  const syncType = action.payload?.syncType || 1;
  try {
    if (syncType === 1) {
      startLoading();
    }
    const response = yield call(syncChats, syncType);
    if (response.data.status === 'success') {
      const updateMessageId = response.data.update_message_id;
      if (updateMessageId) {
        yield fork(syncAcknowledge, updateMessageId);
      }
      const updates = response.data.updates;
      const pinnedChatIds = new Set(response.data.pinned_chats || []);
      if (updates) {
        const chatsArray = Object.keys(updates).map(key => {
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
              pinned: pinnedChatIds.has(key),
            };
        });
        setChats(chatsArray);
      } else {
        setChats([]);
      }
    } else {
      throw new Error(response.data.reason || 'خطایی در دریافت اطلاعات رخ داد');
    }
  } catch (error) {
    setError(error.message);
  }
}

function* deleteChatsSaga(action) {
  const { chatIds } = action.payload;
  const { removeChats, setError } = useChatStore.getState();
  if (!chatIds || chatIds.length === 0) return;
  try {
    const response = yield call(clearHistory, chatIds);
    if (response.data.status === 'success') {
      removeChats(chatIds);
    } else {
      throw new Error(response.data.reason || 'Server returned an error on deletion.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.reason || error.message || 'خطا در حذف چت';
    setError(errorMessage);
  }
}

function* pinChatSaga(action) {
  const { chatId } = action.payload;
  const { togglePinStatus } = useChatStore.getState();
  yield call(togglePinStatus, chatId);
  try {
    const currentChats = yield select(state => useChatStore.getState().chats);
    const pinnedChatIds = currentChats.filter(c => c.pinned).map(c => c.id);
    const response = yield call(pinChats, pinnedChatIds);
    if (response.data.status !== 'success') {
      throw new Error(response.data.reason || 'خطا در پین کردن چت');
    }
  } catch (error) {
    const errorMessage = error.message;
    console.error('[Saga] خطا در پین کردن چت:', errorMessage);
    if (errorMessage === 'access_denied') {
      Alert.alert('عدم دسترسی', 'شما اجازه پین کردن این چت را ندارید.');
    } else {
      Alert.alert('خطا', `عملیات پین کردن ناموفق بود: \n${errorMessage}`);
    }
    yield call(togglePinStatus, chatId);
  }
}

export function* watchFetchChats() {
  yield takeLatest(FETCH_CHATS, fetchChatsSaga);
}
export function* watchDeleteChats() {
  yield takeLatest(DELETE_CHATS, deleteChatsSaga);
}
export function* watchPinChat() {
  yield takeLatest(TOGGLE_PIN_CHAT, pinChatSaga);
}