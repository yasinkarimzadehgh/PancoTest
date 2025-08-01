import { takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { registerDevice as registerDeviceAPI } from '../../api/apiService';
import { t } from '../../utils/localizationUtils';
import { REGISTER_DEVICE } from './actions';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    Alert.alert(t('notification.permissionTitle'), t('notification.permissionMessage'));
  }
  return enabled;
}

function* registerDeviceSaga() {
  try {
    const hasPermission = yield call(requestUserPermission);
    if (!hasPermission) {
      return;
    }
    const fcmToken = yield call([messaging(), 'getToken']);
    if (fcmToken) {
      yield call(registerDeviceAPI, fcmToken);
    } else {
      console.error('Failed to get FCM token. Notifications will not work.');
    }
  } catch (error) {
    console.error('Error in registerDeviceSaga:', error.message);
  }
}

export function* notificationSaga() {
  yield takeLatest(REGISTER_DEVICE, registerDeviceSaga);
}