// src/api/websocketService.js

import { Client } from '@stomp/stompjs';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

const SESSION_ID = 'a4c469257f583f1f98263fec5075e019';

const WEBSOCKET_CONFIG = {
  brokerURL: 'wss://api.panco.me:15673/ws',
  connectHeaders: {
    login: 'panco',
    passcode: 'panco',
    host: '/', 
  },
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
};

let client = null;
let messageEmitter = null; // --- کد جدید: یک متغیر برای نگهداری emitter

// --- کد جدید: تابعی که saga آن را ثبت می‌کند ---
export const setWebSocketMessageHandler = (emitter) => {
  messageEmitter = emitter;
};

const onMessageReceived = (message) => {
  try {
    const parsedData = JSON.parse(message.body);
    console.log('[WebSocket] پیام جدید دریافت شد:', parsedData);
    
    // اگر یک listener (از saga) ثبت شده بود، پیام را به آن بفرست
    if (messageEmitter) {
      messageEmitter(parsedData);
    }
    
  } catch (error) {
    console.error('[WebSocket] خطای پردازش پیام:', error);
  }
};

export const initWebSocket = () => {
  if (client && client.active) return;

  client = new Client({
    ...WEBSOCKET_CONFIG,
    onConnect: () => {
      console.log('[WebSocket] اتصال با موفقیت برقرار شد.');
      client.subscribe(`/queue/${SESSION_ID}`, onMessageReceived);
    },
    onStompError: (frame) => console.error('[WebSocket] خطای STOMP:', frame.headers['message']),
    onWebSocketError: (event) => console.error('[WebSocket] خطا در اتصال WebSocket:', event),
    onDisconnect: () => console.log('[WebSocket] اتصال قطع شد.'),
  });
  
  client.activate();
};