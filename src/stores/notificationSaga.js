// src/stores/notificationSaga.js

import { call, takeLatest } from 'redux-saga/effects';
import messaging from '@react-native-firebase/messaging';
import { registerDevice } from '../api/apiService';

export const REGISTER_DEVICE_TOKEN = 'REGISTER_DEVICE_TOKEN';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  return enabled;
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
      console.log('[Saga] FCM Token Received:', fcmToken);
      const response = yield call(registerDevice, fcmToken);
      
      if (response.data.status === 'success') {
        console.log('[Saga] Device token registered successfully on server.');
      } else {
        // اگر سرور خطا برگرداند، آن را پرتاب می‌کنیم تا catch مدیریت کند
        throw new Error(response.data.reason || 'Failed to register device on server.');
      }
    } else {
      console.log('[Saga] Failed to get FCM token.');
    }
  } catch (error) {
    // ====================== اصلاح کلیدی در اینجا ======================
    // به جای error.message، خود آبجکت error.response.data را لاگ می‌کنیم
    if (error.response) {
      console.error('[Saga] Error in registerDeviceSaga - Server Response:', JSON.stringify(error.response.data));
    } else {
      console.error('[Saga] Error in registerDeviceSaga - General Error:', error.message);
    }
    // =============================================================
  }
}

export function* watchRegisterDevice() {
  yield takeLatest(REGISTER_DEVICE_TOKEN, registerDeviceSaga);
}