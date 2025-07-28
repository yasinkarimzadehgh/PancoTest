import { create } from 'zustand';

const useChatStore = create((set) => ({
  chats: [],
  isLoading: true,
  error: null,

  startLoading: () => set({ isLoading: true, error: null }),
  setChats: (chatsData) => set({
    chats: chatsData.map(c => ({ ...c, pinned: c.pinned || false })),
    isLoading: false
  }),
  setError: (errorMessage) => set({ error: errorMessage, isLoading: false }),
  removeChats: (chatIds) =>
    set((state) => ({
      chats: state.chats.filter(chat => !chatIds.includes(chat.id)),
    })),

  togglePinStatus: (chatId) => set((state) => {
    const newChats = state.chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, pinned: !chat.pinned };
      }
      return chat;
    });
    return { chats: newChats.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) };
  }),
}));

export default useChatStore;