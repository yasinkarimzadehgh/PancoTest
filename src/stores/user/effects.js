import { takeLatest, call } from 'redux-saga/effects';
import { Q } from '@nozbe/watermelondb';
import { setState } from 'zustand-saga';
import { getProfileInfo } from '../../api/apiService';
import { database } from '../../db';
import { getImageUrl } from '../../utils/imageUtils';
import { t } from '../../utils/localizationUtils';
import { FETCH_PROFILE } from './actions';

async function saveUserToDB(profileData) {
  // console.log('[DB] Saving user to DB:', profileData.id);
  const usersCollection = database.get('users');
  const userId = String(profileData.id);
  const existingUsers = await usersCollection.query(Q.where('remote_id', userId)).fetch();
  const userData = {
    remoteId: userId,
    name: profileData.name || t('profile.defaultName'),
    userName: profileData.user_name,
    phoneNumber: profileData.phone_number,
    description: profileData.description,
    avatarUrl: getImageUrl(profileData.image_server_id, profileData.image_path),
    lastActiveTime: profileData.last_active_time,
    views: profileData.views,
    likes: profileData.likes,
    followed: profileData.followed,
    createdDate: profileData.created_date,
  };
  await database.write(async () => {
    if (existingUsers.length > 0) {
      // console.log('[DB] Updating existing user:', userId);
      await existingUsers[0].update(record => {
        Object.assign(record, userData);
      });
    } else {
      // console.log('[DB] Creating new user:', userId);
      await usersCollection.create(record => {
        Object.assign(record, userData);
      });
    }
  });
}
function* fetchProfileSaga(action) {
  // console.log('[SAGA] Starting fetchProfileSaga with payload:', action.payload);
  const { userId } = action.payload;
  if (!userId) return;
  yield setState({ isLoading: true, error: null });
  try {
    const response = yield call(getProfileInfo, userId);
    // console.log('[SAGA] fetchProfileSaga API call successful.');
    if (response.data.status === 'success' && response.data.result.length > 0) {
      const profile = response.data.result[0];
      yield call(saveUserToDB, profile);
      yield setState({ isLoading: false });
    } else {
      throw new Error(response.data.reason || t('profile.notFound'));
    }
  } catch (error) {
    // console.error('[SAGA] Error in fetchProfileSaga:', error.message);
    yield setState({ error: error.message, isLoading: false });
  }
}
export function* userSaga() {
  yield takeLatest(FETCH_PROFILE, fetchProfileSaga);
}