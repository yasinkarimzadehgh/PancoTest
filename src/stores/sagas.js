// src/stores/sagas.js
import { all, fork } from 'redux-saga/effects';
import { watchFetchChats, watchDeleteChats, watchPinChat } from './chatSaga';
import { watchFetchProfile } from './profileSaga';
import { websocketSaga } from './websocketSaga';
import { watchRegisterDevice } from './notificationSaga'; // <--- ایمپورت

export default function* rootSaga() {
  yield all([
    fork(watchFetchChats),
    fork(watchFetchProfile),
    fork(websocketSaga),
    fork(watchDeleteChats),
    fork(watchPinChat),
    fork(watchRegisterDevice), // <--- ثبت
  ]);
}