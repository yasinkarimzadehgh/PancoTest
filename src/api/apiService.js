import axios from 'axios';
import { Platform } from 'react-native';
import { SESSION_ID, BASE_URL } from './config';

export const syncChats = async (syncType = 1) => {
  // console.log(`[API] syncChats called with syncType: ${syncType}`);
  const url = `${BASE_URL}/sync?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('new', syncType);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('[API] syncChats success.');
    return response;
  } catch (error) {
    // console.error('[API] syncChats error:', error.message);
    throw error;
  }
};

export const syncAcknowledge = async (updateMessageId) => {
  // console.log(`[API] syncAcknowledge called with updateMessageId: ${updateMessageId}`);
  const url = `${BASE_URL}/sync_acknowledge?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('update_message_id', updateMessageId);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('[API] syncAcknowledge success.');
    return response;
  } catch (error) {
    // console.error('[API] syncAcknowledge error:', error.message);
    throw error;
  }
};

export const getProfileInfo = async (userId) => {
    // console.log(`[API] getProfileInfo called with userId: ${userId}`);
    const url = `${BASE_URL}/get_user_info?$=${SESSION_ID}`;
    const body = new FormData();
    body.append('users', `[{"user_id":${userId}}]`);
    try {
        const response = await axios.post(url, body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        // console.log('[API] getProfileInfo success.');
        return response;
    } catch (error) {
        // console.error('[API] getProfileInfo error:', error.message);
        throw error;
    }
};

export const clearHistory = async (chatIds) => {
  // console.log(`[API] clearHistory called with chatIds:`, chatIds);
  const url = `${BASE_URL}/clear_history?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(chatIds));
  body.append('delete', 1);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('[API] clearHistory success.');
    return response;
  } catch (error) {
    // console.error('[API] clearHistory error:', error.message);
    throw error;
  }
};

export const pinChats = async (pinnedChatIds) => {
  // console.log(`[API] pinChats called with pinnedChatIds:`, pinnedChatIds);
  const url = `${BASE_URL}/pin_chat?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(pinnedChatIds));
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('[API] pinChats success.');
    return response;
  } catch (error) {
    // console.error('[API] pinChats error:', error.message);
    throw error;
  }
};

export const registerDevice = async (fcmToken) => {
  // console.log(`[API] registerDevice called with fcmToken:`, fcmToken);
  const url = `${BASE_URL}/register_device?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('register_id', fcmToken);
  body.append('device_model', Platform.OS);
  body.append('version', '1.5.99');
  body.append('bundle_version', '1.3.16');
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('[API] registerDevice success.');
    return response;
  } catch (error) {
    // console.error('[API] registerDevice error:', error.message);
    throw error;
  }
};