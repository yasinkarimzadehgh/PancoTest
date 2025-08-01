export const FETCH_CHATS = 'chat/FETCH_CHATS';
export const DELETE_CHATS = 'chat/DELETE_CHATS';
export const TOGGLE_PIN_CHAT = 'chat/TOGGLE_PIN_CHAT';
export const WEBSOCKET_MESSAGE_RECEIVED = 'chat/WEBSOCKET_MESSAGE_RECEIVED';

export const actions = {
  fetchChats: (payload) => ({
    type: FETCH_CHATS,
    payload,
  }),
  deleteChats: (payload) => ({
    type: DELETE_CHATS,
    payload,
  }),
  togglePinChat: (payload) => ({
    type: TOGGLE_PIN_CHAT,
    payload,
  }),
  websocketMessageReceived: (payload) => ({
    type: WEBSOCKET_MESSAGE_RECEIVED,
    payload,
  }),
};