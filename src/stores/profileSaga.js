// src/stores/profileSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { getProfileInfo } from '../api/apiService';
import useProfileStore from './profileStore';

export const FETCH_PROFILE = 'FETCH_PROFILE';

function* fetchProfileSaga(action) {
  const { userId } = action.payload;
  if (!userId) return; // اگر ID وجود نداشت، کاری نکن

  const { startLoading, setProfile, setError } = useProfileStore.getState();

  try {
    startLoading();
    
    const response = yield call(getProfileInfo, userId);

    if (response.data.status === 'success' && response.data.result && response.data.result.length > 0) {
      // سرور اطلاعات را در قالب یک آرایه برمی‌گرداند، ما اولین آیتم را نیاز داریم
      setProfile(response.data.result[0]);
    } else {
      throw new Error(response.data.reason || 'کاربر یافت نشد');
    }
  } catch (error) {
    setError(error.message);
  }
}

export function* watchFetchProfile() {
  yield takeLatest(FETCH_PROFILE, fetchProfileSaga);
}