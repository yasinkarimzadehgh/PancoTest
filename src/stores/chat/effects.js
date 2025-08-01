import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { Q } from '@nozbe/watermelondb';
import { setState } from 'zustand-saga';
import { syncChats, syncAcknowledge, clearHistory, pinChats } from '../../api/apiService';
import { database } from '../../db';
import { getImageUrl } from '../../utils/imageUtils';
import { t } from '../../utils/localizationUtils';
import { FETCH_CHATS, DELETE_CHATS, TOGGLE_PIN_CHAT, WEBSOCKET_MESSAGE_RECEIVED } from './actions';

async function updateChatsInDatabase(updates, pinnedChatIds) {
  // console.log('[DB] Starting batch update for chats.');
  const chatsCollection = database.get('chats');
  const allRemoteIds = Object.keys(updates);
  const existingChats = await chatsCollection.query(Q.where('remote_id', Q.oneOf(allRemoteIds))).fetch();
  const existingChatsMap = new Map(existingChats.map(c => [c.remoteId, c]));
  const batchOperations = allRemoteIds.map(key => {
    const chatData = updates[key];
    const lastMessageItem = chatData.sort((a, b) => b.date - a.date).find(item => item.message_id);
    const chatInfo = chatData.find(item => item.chat_type !== undefined);
    const existingChat = existingChatsMap.get(key);
    const otherPartyIdValue = chatInfo?.other_party_id;
    const mappedData = {
      remoteId: key,
      name: chatInfo?.chat_name === 'myself' ? t('chat.savedMessages') : (chatInfo?.chat_name || t('chat.unknownChat')),
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
  // console.log('[DB] Batch update for chats finished.');
}
function* fetchChatsSaga(action) {
  // console.log('[SAGA] Starting fetchChatsSaga with payload:', action.payload);
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
    // console.log('[SAGA] fetchChatsSaga API call successful.');
    if (response.data.status === 'success') {
      if (response.data.update_message_id) {
        // console.log('[SAGA] Forking syncAcknowledge.');
        yield fork(syncAcknowledge, response.data.update_message_id);
      }
      const { updates, pinned_chats = [] } = response.data;
      if (updates) {
        const pinnedIds = new Set(pinned_chats);
        yield call(updateChatsInDatabase, updates, pinnedIds);
      }
    } else {
      throw new Error(response.data.reason || t('common.serverError'));
    }
  } catch (error) {
    // console.error('[SAGA] Error in fetchChatsSaga:', error.message);
    const chatCount = yield call([chatsCollection.query(), 'fetchCount']);
    if (chatCount === 0) {
      yield setState({ error: error.message });
    } else {
      console.log("Failed to sync in background:", error.message);
    }
  } finally {
    // console.log('[SAGA] Finished fetchChatsSaga.');
    yield setState({ isLoading: false });
  }
}
function* deleteChatsSaga(action) {
  // console.log('[SAGA] Starting deleteChatsSaga with payload:', action.payload);
  const { chatIds } = action.payload;
  if (!chatIds || chatIds.length === 0) return;
  try {
    const response = yield call(clearHistory, chatIds);
    // console.log('[SAGA] deleteChatsSaga API call successful.');
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
    // console.error('[SAGA] Error in deleteChatsSaga:', error.message);
    yield setState({ error: error.message });
  }
}
function* pinChatSaga(action) {
  // console.log('[SAGA] Starting pinChatSaga with payload:', action.payload);
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
      // console.log('[SAGA] pinChatSaga API call successful.');
      if (response.data.status !== 'success') {
        throw new Error(response.data.reason);
      }
    }
  } catch (error) {
    // console.error('[SAGA] Error in pinChatSaga:', error.message);
    Alert.alert(t('common.error'), `${t('chat.pinFailed')}: ${error.message}`);
  }
}
function* handleWebSocketMessage(action) {
  // console.log('[SAGA] Handling WebSocket message:', action.payload);
  yield call(fetchChatsSaga, { payload: { syncType: 2 } });
}
export function* chatSaga() {
  yield takeLatest(FETCH_CHATS, fetchChatsSaga);
  yield takeLatest(DELETE_CHATS, deleteChatsSaga);
  yield takeLatest(TOGGLE_PIN_CHAT, pinChatSaga);
  yield takeLatest(WEBSOCKET_MESSAGE_RECEIVED, handleWebSocketMessage);
}