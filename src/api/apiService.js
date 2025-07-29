import axios from 'axios';

const SESSION_ID = '1209e015a0293cd99edb8a7024dcf0ba';
const BASE_URL = 'https://api.panco.me/a/17';

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