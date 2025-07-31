import { create } from 'zustand';
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';
import { Alert } from 'react-native';
import { Q } from '@nozbe/watermelondb';

import { syncChats, syncAcknowledge, clearHistory, pinChats } from '../api/apiService';
import { database } from '../db';
import { getImageUrl } from '../utils/imageUtils';

const FETCH_CHATS = 'FETCH_CHATS';
const DELETE_CHATS = 'DELETE_CHATS';
const TOGGLE_PIN_CHAT = 'TOGGLE_PIN_CHAT';
const WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';

async function updateChatsInDatabase(updates, pinnedChatIds) {
  const chatsCollection = database.get('chats');
  const allRemoteIds = Object.keys(updates);
  const existingChats = await chatsCollection.query(Q.where('remote_id', Q.oneOf(allRemoteIds))).fetch();
  const existingChatsMap = new Map(existingChats.map(c => [c.remoteId, c]));
  
  const batchOperations = allRemoteIds.map(key => {
    const chatData = updates[key];
    const lastMessageItem = chatData.sort((a,b) => b.date - a.date).find(item => item.message_id);
    const chatInfo = chatData.find(item => item.chat_type !== undefined);
    const existingChat = existingChatsMap.get(key);
    const otherPartyIdValue = chatInfo?.other_party_id;

    const mappedData = {
      remoteId: key,
      name: chatInfo?.chat_name === 'myself' ? 'پیام‌های ذخیره شده' : (chatInfo?.chat_name || 'چت ناشناس'),
      lastMessage: lastMessageItem?.body || '...',
      lastMessageAt: lastMessageItem ? new Date(lastMessageItem.date * 1000) : new Date(),
      unreadCount: chatInfo?.unread_messages || 0,
      avatarUrl: getImageUrl(chatInfo?.chat_image_server_id, chatInfo?.chat_image_path),
      otherPartyId: otherPartyIdValue ? String(otherPartyIdValue) : null,
      isPinned: pinnedChatIds.has(key),
    };

    if (existingChat) {
      return existingChat.prepareUpdate(record => {
        Object.assign(record, mappedData);
      });
    } else {
      return chatsCollection.prepareCreate(record => {
        Object.assign(record, mappedData);
      });
    }
  });

  await database.write(async () => {
    await database.batch(...batchOperations);
  });
}

function* fetchChatsSaga(action) {
  const syncType = action.payload?.syncType || 1;
  const chatsCollection = database.get('chats');
  
  try {
    const chatCount = yield call([chatsCollection.query(), 'fetchCount']);
    
    if (chatCount > 0) {
      yield setState({ isLoading: false, error: null });
    } else {
      yield setState({ isLoading: true, error: null });
    }

    const response = yield call(syncChats, syncType);

    if (response.data.status === 'success') {
      if (response.data.update_message_id) {
        yield fork(syncAcknowledge, response.data.update_message_id);
      }
      const { updates, pinned_chats = [] } = response.data;
      if (updates) {
        const pinnedIds = new Set(pinned_chats);
        yield call(updateChatsInDatabase, updates, pinnedIds);
      }
    } else {
      throw new Error(response.data.reason || 'خطای سرور');
    }
  } catch (error) {
    const chatCount = yield call([chatsCollection.query(), 'fetchCount']);
    if (chatCount === 0) {
      yield setState({ error: error.message });
    } else {
      console.log("Failed to sync in background:", error.message);
    }
  } finally {
    yield setState({ isLoading: false });
  }
}

function* deleteChatsSaga(action) {
  const { chatIds } = action.payload;
  if (!chatIds || chatIds.length === 0) return;
  try {
    const response = yield call(clearHistory, chatIds);
    if (response.data.status === 'success') {
      const chatsToDelete = yield database.get('chats').query(Q.where('remote_id', Q.oneOf(chatIds))).fetch();
      const batchDeletions = chatsToDelete.map(chat => chat.prepareDestroyPermanently());
      yield database.write(async () => {
        await database.batch(...batchDeletions);
      });
    } else {
      throw new Error(response.data.reason);
    }
  } catch (error) {
    yield setState({ error: error.message });
  }
}

function* pinChatSaga(action) {
    const { chatId } = action.payload;
    try {
        const chats = yield database.get('chats').query(Q.where('remote_id', chatId)).fetch();
        if (chats.length > 0) {
            const chat = chats[0];
            const newPinnedStatus = !chat.isPinned;
            
            yield database.write(async () => {
                await chat.update(record => {
                    record.isPinned = newPinnedStatus;
                });
            });

            const allChats = yield database.get('chats').query().fetch();
            const pinnedChatIds = allChats.filter(c => c.isPinned).map(c => c.remoteId);
            
            const response = yield call(pinChats, pinnedChatIds);
            if (response.data.status !== 'success') {
                throw new Error(response.data.reason);
            }
        }
    } catch (error) {
        Alert.alert('خطا', `عملیات پین کردن ناموفق بود: ${error.message}`);
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
    isLoading: true,
    error: null,
    fetchChats: (payload) => store.putActionToSaga({ type: FETCH_CHATS, payload }),
    deleteChats: (payload) => store.putActionToSaga({ type: DELETE_CHATS, payload }),
    togglePinChat: (payload) => store.putActionToSaga({ type: TOGGLE_PIN_CHAT, payload }),
    websocketMessageReceived: (payload) => store.putActionToSaga({ type: WEBSOCKET_MESSAGE_RECEIVED, payload }),
  }))
);

export default useChatStore;