export const FETCH_PROFILE = 'user/FETCH_PROFILE';
export const FETCH_OWN_PROFILE = 'user/FETCH_OWN_PROFILE';

export const actions = {
  fetchProfile: (payload) => ({
    type: FETCH_PROFILE,
    payload,
  })
};