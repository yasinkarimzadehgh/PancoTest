import axios from 'axios';

const SESSION_ID = 'a4c469257f583f1f98263fec5075e019';
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