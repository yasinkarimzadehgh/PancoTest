// src/stores/profileStore.js

import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profile: null,      // آبجکتی برای نگهداری اطلاعات پروفایل کاربر
  isLoading: true,    // وضعیت بارگذاری
  error: null,        // برای نگهداری خطاها

  startLoading: () => set({ isLoading: true, error: null, profile: null }),

  setProfile: (profileData) => set({ profile: profileData, isLoading: false }),

  setError: (errorMessage) => set({ error: errorMessage, isLoading: false }),
}));

export default useProfileStore;