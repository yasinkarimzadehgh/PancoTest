// src/stores/sagas.js

import { all, fork } from 'redux-saga/effects';
import { watchFetchChats } from './chatSaga';
import { watchFetchProfile } from './profileSaga';
import { websocketSaga } from './websocketSaga'; // ایمپورت ساگای جدید

export default function* rootSaga() {
  yield all([
    fork(watchFetchChats),
    fork(watchFetchProfile),
    fork(websocketSaga), // ثبت ساگای WebSocket
  ]);
}