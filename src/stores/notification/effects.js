import { takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { registerDevice as registerDeviceAPI } from '../../api/apiService';
import { t } from '../../utils/localizationUtils';
import { REGISTER_DEVICE } from './actions';

async function requestUserPermission() {
  // console.log('[SAGA] Requesting notification permission...');
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // console.log(`[SAGA] Notification permission status: ${authStatus}`, { enabled });
  if (!enabled) {
    Alert.alert(t('notification.permissionTitle'), t('notification.permissionMessage'));
  }
  return enabled;
}

function* registerDeviceSaga() {
  // console.log('[SAGA] Starting registerDeviceSaga.');
  try {
    const hasPermission = yield call(requestUserPermission);
    if (!hasPermission) {
      // console.log('[SAGA] Notification permission not granted. Aborting registration.');
      return;
    }
    const fcmToken = yield call([messaging(), 'getToken']);
    if (fcmToken) {
      // console.log(`[SAGA] FCM Token obtained.`);
      yield call(registerDeviceAPI, fcmToken);
      // console.log('[SAGA] registerDevice API call finished.');
    } else {
      console.error('Failed to get FCM token. Notifications will not work.');
    }
  } catch (error) {
    // console.error('[SAGA] Error in registerDeviceSaga:', error.message);
  }
}

export function* notificationSaga() {
  yield takeLatest(REGISTER_DEVICE, registerDeviceSaga);
}