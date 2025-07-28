import { all, fork } from 'redux-saga/effects';
import { watchFetchChats, watchDeleteChats, watchPinChat } from './chatSaga';
import { watchFetchProfile } from './profileSaga';
import { websocketSaga } from './websocketSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchChats),
    fork(watchFetchProfile),
    fork(websocketSaga),
    fork(watchDeleteChats),
    fork(watchPinChat),
  ]);
}