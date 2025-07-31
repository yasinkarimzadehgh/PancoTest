import { create } from 'zustand';
import { takeLatest, call } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';
import { Q } from '@nozbe/watermelondb';
import { getProfileInfo } from '../api/apiService';
import { database } from '../db';
import { getImageUrl } from '../utils/imageUtils';
import { OWNER_USER_ID } from '../api/config';

const FETCH_PROFILE = 'FETCH_PROFILE';
const FETCH_OWN_PROFILE = 'FETCH_OWN_PROFILE';

async function saveUserToDB(profileData) {
  const usersCollection = database.get('users');
  const userId = profileData.id.toString();
  
  const existingUsers = await usersCollection.query(Q.where('remote_id', userId)).fetch();

  const userData = {
      remoteId: userId,
      name: profileData.name || 'کاربر پنکو',
      userName: profileData.user_name,
      phoneNumber: profileData.phone_number,
      description: profileData.description,
      avatarUrl: getImageUrl(profileData.image_server_id, profileData.image_path),
      followers: profileData.followers,
      following: profileData.following,
  };

  await database.write(async () => {
    if (existingUsers.length > 0) {
      await existingUsers[0].update(record => {
        Object.assign(record, userData);
      });
    } else {
      await usersCollection.create(record => {
        Object.assign(record, userData);
      });
    }
  });
}


function* fetchProfileSaga(action) {
    const { userId } = action.payload;
    if (!userId) return;

    yield setState({ isLoading: true, error: null });
    try {
        const response = yield call(getProfileInfo, userId);
        if (response.data.status === 'success' && response.data.result.length > 0) {
            const profile = response.data.result[0];
            yield call(saveUserToDB, profile);
            yield setState({ isLoading: false });
        } else {
            throw new Error(response.data.reason || 'کاربر یافت نشد');
        }
    } catch (error) {
        yield setState({ error: error.message, isLoading: false });
    }
}

function* fetchOwnProfileSaga() {
  try {
    const response = yield call(getProfileInfo, OWNER_USER_ID);
    if (response.data.status === 'success' && response.data.result.length > 0) {
      const profile = response.data.result[0];
      yield call(saveUserToDB, profile);
    }
  } catch (error) {
    console.error('Failed to fetch own profile:', error.message);
  }
}

function* saga() {
    yield takeLatest(FETCH_PROFILE, fetchProfileSaga);
    yield takeLatest(FETCH_OWN_PROFILE, fetchOwnProfileSaga);
}

const useProfileStore = create(
  sagaMiddleware(saga, (set, get, store) => ({
    isLoading: true,
    error: null,
    fetchProfile: (payload) => store.putActionToSaga({ type: FETCH_PROFILE, payload }),
    fetchOwnProfile: () => store.putActionToSaga({ type: FETCH_OWN_PROFILE }),
  }))
);

export default useProfileStore;