// src/stores/chatStore.js

import { create } from 'zustand';

const useChatStore = create((set) => ({
  chats: [], 
  isLoading: true,
  error: null, 

  startLoading: () => set({ isLoading: true, error: null }),
  setChats: (chatsData) => set({ chats: chatsData, isLoading: false }),
  setError: (errorMessage) => set({ error: errorMessage, isLoading: false }),
}));

export default useChatStore;