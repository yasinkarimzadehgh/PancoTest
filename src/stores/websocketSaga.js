// src/stores/websocketSaga.js

import { eventChannel, END } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import { setWebSocketMessageHandler } from '../api/websocketService';
import { FETCH_CHATS } from './chatSaga';

// ۱. ساخت کانال
function createWebSocketChannel() {
  return eventChannel(emitter => {
    // پیام‌های دریافتی از WebSocket را به عنوان یک رویداد در کانال قرار می‌دهیم
    setWebSocketMessageHandler(message => {
      emitter(message);
    });

    // تابع unsubscribe: وقتی saga کنسل شد، این تابع اجرا می‌شود.
    return () => {
      // در اینجا می‌توان منطق قطع اتصال را قرار داد، اما فعلاً خالی می‌ماند
    };
  });
}

// ۲. ساگایی که به کانال گوش می‌دهد
function* watchWebSocketMessages() {
  const channel = yield call(createWebSocketChannel);

  try {
    while (true) {
      // منتظر یک پیام از کانال WebSocket می‌مانیم
      const message = yield take(channel);

      // ۳. هر پیامی که آمد، یک sync آپدیت اجرا می‌کنیم
      console.log('[Saga] پیامی از WebSocket دریافت شد، در حال اجرای sync type 2...');
      yield put({ type: FETCH_CHATS, payload: { syncType: 2 } });
    }
  } finally {
    console.log('کانال WebSocket بسته شد.');
  }
}

// روت ساگا برای WebSocket
export function* websocketSaga() {
  yield fork(watchWebSocketMessages);
}