// src/stores/websocketSaga.js

import { eventChannel } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import { setWebSocketMessageHandler } from '../api/websocketService';
import { FETCH_CHATS } from './chatSaga';

function createWebSocketChannel() {
  return eventChannel(emitter => {
    setWebSocketMessageHandler(message => {
      emitter(message);
    });
    return () => {};
  });
}

function* watchWebSocketMessages() {
  const channel = yield call(createWebSocketChannel);

  try {
    while (true) {
      const message = yield take(channel);
      console.log('[Saga] پیامی از WebSocket دریافت شد، در حال اجرای sync type 2...', message);
      // حالا دوباره API sync را فراخوانی می‌کنیم
      yield put({ type: FETCH_CHATS, payload: { syncType: 2 } });
    }
  } finally {
    console.log('کانال WebSocket بسته شد.');
  }
}

export function* websocketSaga() {
  yield fork(watchWebSocketMessages);
}