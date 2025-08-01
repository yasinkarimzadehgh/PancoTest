import NetInfo from "@react-native-community/netinfo";
import { KAFKA_WEBSOCKET_URL } from './config';
import useChatStore from '../stores/chat';

let ws = null;
let pingTimeout = null;
let isConnected = false;

const sendPing = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    // console.log('[WebSocket] Sending PING');
    ws.send('PING');
    pingTimeout = setTimeout(sendPing, 20000);
  }
};

const onMessageReceived = (event) => {
  // console.log('[WebSocket] Raw message received:', event.data);
  const messageData = event.data;
  if (messageData === 'PONG') {
    // console.log('[WebSocket] PONG received.');
    return;
  }
  try {
    const parsedData = JSON.parse(messageData);
    // console.log('[WebSocket] Parsed message:', parsedData);
    useChatStore.getState().websocketMessageReceived(parsedData);
  } catch (error) {
    // console.error('[WebSocket] Error processing Kafka message:', error);
  }
};

export const initWebSocket = async () => {
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    // console.log('[WebSocket] No internet connection. Skipping connection attempt.');
    return;
  }

  if (ws && ws.readyState === WebSocket.OPEN) return;
  if (ws) ws.close();
  if (pingTimeout) clearTimeout(pingTimeout);

  ws = new WebSocket(KAFKA_WEBSOCKET_URL);

  ws.onopen = () => {
    // console.log('[WebSocket] Kafka connection established successfully.');
    sendPing();
  };

  ws.onmessage = onMessageReceived;

  ws.onerror = (error) => {
    // console.error('[WebSocket] Kafka connection error:', error.message);
  };

  ws.onclose = () => {
    // console.log('[WebSocket] Kafka connection closed.');
    if (pingTimeout) clearTimeout(pingTimeout);
  };
};

export const disconnectWebSocket = () => {
  if (pingTimeout) clearTimeout(pingTimeout);
  if (ws) {
    ws.close();
    ws = null;
  }
};

const handleConnectivityChange = (state) => {
  // console.log('[NetInfo] Connectivity changed:', state);
  if (state.isConnected && !isConnected) {
    // console.log('[NetInfo] Connection is back online. Attempting to connect WebSocket.');
    initWebSocket();
  }
  isConnected = state.isConnected;
};

export const initializeNetworkObserver = () => {
  NetInfo.addEventListener(handleConnectivityChange);
};