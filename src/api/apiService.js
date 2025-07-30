import axios from 'axios';
import { Platform } from 'react-native';
import { SESSION_ID, BASE_URL } from './config'; 

export const syncChats = (syncType = 1) => {
  const url = `${BASE_URL}/sync?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('new', syncType);
  return axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const syncAcknowledge = (updateMessageId) => {
  const url = `${BASE_URL}/sync_acknowledge?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('update_message_id', updateMessageId);
  return axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getProfileInfo = (userId) => {
    const url = `${BASE_URL}/get_user_info?$=${SESSION_ID}`;
    const body = new FormData();
    body.append('users', `[{"user_id":${userId}}]`);
    return axios.post(url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const clearHistory = (chatIds) => {
  const url = `${BASE_URL}/clear_history?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(chatIds));
  body.append('delete', 1);
  return axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const pinChats = (pinnedChatIds) => {
  const url = `${BASE_URL}/pin_chat?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('chat_ids', JSON.stringify(pinnedChatIds));
  return axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const registerDevice = (fcmToken) => {
  const url = `${BASE_URL}/register_device?$=${SESSION_ID}`;
  const body = new FormData();
  body.append('register_id', fcmToken);
  body.append('device_model', Platform.OS);
  body.append('version', '1.5.99');
  body.append('bundle_version', '1.3.16');

  return axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};