import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { syncChats, syncAcknowledge } from '../api/apiService';
import useChatStore from './chatStore';

export const FETCH_CHATS = 'FETCH_CHATS';

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
      if (updates) {
        const chatsArray = Object.keys(updates).map(key => {
            const chatData = updates[key];
            const messages = chatData.filter(item => item.message_id);
            messages.sort((a, b) => b.date - a.date);
            const lastMessageItem = messages.length > 0 ? messages[0] : null;
            const chatInfo = chatData.find(item => item.chat_type !== undefined);
            
            return {
              id: key,
              name: chatInfo?.chat_name || 'چت ناشناس',
              lastMessage: lastMessageItem?.body || '...',
              time: lastMessageItem ? new Date(lastMessageItem.date * 1000).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : '',
              unreadCount: chatInfo?.unread_messages || 0,
              avatarUrl: chatInfo?.chat_image_path ? `https://media.panco.me/${chatInfo.chat_image_server_id}/${chatInfo.chat_image_path}` : null,
              otherPartyId: chatInfo?.other_party_id || null, 
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

export function* watchFetchChats() {
  yield takeLatest(FETCH_CHATS, fetchChatsSaga);
}