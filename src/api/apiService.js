import axios from 'axios';
import { Platform } from 'react-native';
import { SESSION_ID, BASE_URL } from './config';

export const syncChats = async (syncType = 1) => {
  const url = `${BASE_URL}/sync?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('new', syncType);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const syncAcknowledge = async (updateMessageId) => {
  const url = `${BASE_URL}/sync_acknowledge?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('update_message_id', updateMessageId);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProfileInfo = async (userId) => {
    const url = `${BASE_URL}/get_user_info?$=${SESSION_ID}`;
    const body = new FormData();
    body.append('users', `[{"user_id":${userId}}]`);
    try {
        const response = await axios.post(url, body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const clearHistory = async (chatIds) => {
  const url = `${BASE_URL}/clear_history?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(chatIds));
  body.append('delete', 1);
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const pinChats = async (pinnedChatIds) => {
  const url = `${BASE_URL}/pin_chat?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(pinnedChatIds));
  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerDevice = async (fcmToken) => {
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
    return response;
  } catch (error) {
    console.error('[API LOG] Error in registerDevice:', error.message);
    throw error;
  }
};