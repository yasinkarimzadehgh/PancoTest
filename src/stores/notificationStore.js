import { create } from 'zustand';
import { takeLatest, call } from 'redux-saga/effects';
import sagaMiddleware from 'zustand-saga';
import messaging from '@react-native-firebase/messaging';
import { registerDevice } from '../api/apiService';

const REGISTER_DEVICE = 'REGISTER_DEVICE';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

function* registerDeviceSaga() {
  try {
    const permissionGranted = yield call(requestUserPermission);
    if (!permissionGranted) {
      console.log('Permission not granted for notifications.');
      return;
    }

    const fcmToken = yield call(messaging().getToken);
    if (fcmToken) {
      const response = yield call(registerDevice, fcmToken);
      if (response.data.status === 'success') {
        console.log('[Saga] Device token registered successfully on server.');
      } else {
        throw new Error(response.data.reason || 'Failed to register device on server.');
      }
    } else {
      console.log('[Saga] Failed to get FCM token.');
    }
  } catch (error) {
    if (error.response) {
      console.error('[Saga] Error in registerDeviceSaga - Server Response:', JSON.stringify(error.response.data));
    } else {
      console.error('[Saga] Error in registerDeviceSaga - General Error:', error.message);
    }
  }
}

function* saga() {
  yield takeLatest(REGISTER_DEVICE, registerDeviceSaga);
}

const useNotificationStore = create(
  sagaMiddleware(saga, (set, get, store) => ({
    registerDevice: () => store.putActionToSaga({ type: REGISTER_DEVICE }),
  }))
);

export default useNotificationStore;