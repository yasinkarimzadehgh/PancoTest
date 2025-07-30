import { create } from 'zustand';
import { takeLatest, call, put } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';
import { getProfileInfo } from '../api/apiService';

const FETCH_PROFILE = 'FETCH_PROFILE';

function* fetchProfileSaga(action) {
    const { userId } = action.payload;
    if (!userId) return;

    yield setState({ isLoading: true, error: null });
    try {
        const response = yield call(getProfileInfo, userId);
        if (response.data.status === 'success' && response.data.result.length > 0) {
            yield setState({ profile: response.data.result[0], isLoading: false });
        } else {
            throw new Error(response.data.reason || 'کاربر یافت نشد');
        }
    } catch (error) {
        yield setState({ error: error.message, isLoading: false });
    }
}

function* saga() {
    yield takeLatest(FETCH_PROFILE, fetchProfileSaga);
}

const useProfileStore = create(
  sagaMiddleware(saga, (set, get, store) => ({
    profile: null,
    isLoading: true,
    error: null,
    fetchProfile: (payload) => store.putActionToSaga({ type: FETCH_PROFILE, payload }),
  }))
);

export default useProfileStore;