// src/stores/chatStore.js

import { create } from 'zustand';

const useChatStore = create((set) => ({
  chats: [], // آرایه‌ای برای نگهداری لیست چت‌ها
  isLoading: true, // برای نمایش وضعیت بارگذاری
  error: null, // برای نگهداری خطاها

  // اکشنی برای شروع فرآیند بارگذاری
  startLoading: () => set({ isLoading: true, error: null }),

  // اکشنی برای قرار دادن چت‌های دریافت شده در state
  setChats: (chatsData) => set({ chats: chatsData, isLoading: false }),

  // اکشنی برای ثبت خطا
  setError: (errorMessage) => set({ error: errorMessage, isLoading: false }),
}));

export default useChatStore;