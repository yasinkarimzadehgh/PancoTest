// src/api/websocketService.js

import { Alert } from 'react-native';

const SESSION_ID = 'a4c469257f583f1f98263fec5075e019';
const KAFKA_WEBSOCKET_URL = `wss://cmb.panco.me/ws/${SESSION_ID}`;

let ws = null;
let messageEmitter = null; 
let pingTimeout = null;

export const setWebSocketMessageHandler = (emitter) => {
  messageEmitter = emitter;
};

const sendPing = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send('PING');
    pingTimeout = setTimeout(sendPing, 20000); 
  }
};

const onMessageReceived = (event) => {
  const messageData = event.data;
  if (messageData === 'PONG') {
    console.log('[WebSocket] Pong received.');
    return;
  }
  
  console.log('[WebSocket] پیام جدید دریافت شد:', messageData);

  try {
    if (messageEmitter) {
      // پیام خام را برای saga ارسال می‌کنیم تا saga خودش آن را parse کند
      messageEmitter({ body: messageData });
    }
  } catch (error) {
    console.error('[WebSocket] خطای پردازش پیام کافکا:', error);
  }
};

export const initWebSocket = () => {
  if (ws && ws.readyState === WebSocket.OPEN) return;
  
  console.log(`[WebSocket] در حال اتصال به کافکا: ${KAFKA_WEBSOCKET_URL}`);
  
  if (ws) ws.close();
  if (pingTimeout) clearTimeout(pingTimeout);

  ws = new WebSocket(KAFKA_WEBSOCKET_URL);

  ws.onopen = () => {
    console.log('[WebSocket] اتصال کافکا با موفقیت برقرار شد.');
    sendPing();
  };

  ws.onmessage = onMessageReceived;

  ws.onerror = (error) => {
    console.error('[WebSocket] خطا در اتصال کافکا:', error.message);
  };

  ws.onclose = (event) => {
    console.log('[WebSocket] اتصال کافکا بسته شد.');
    if (pingTimeout) clearTimeout(pingTimeout);
    setTimeout(initWebSocket, 5000); // تلاش مجدد برای اتصال
  };
};

export const disconnectWebSocket = () => {
    if (pingTimeout) clearTimeout(pingTimeout);
    if (ws) {
        ws.close();
        ws = null;
    }
};