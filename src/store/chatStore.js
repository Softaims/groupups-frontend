import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [],
  chatCompletionPercent: 0,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),
  removeLastMessage: () =>
    set((state) => ({
      messages: state.messages.slice(0, -1),
    })),

  setChatCompletionPercent: (percent) => set(() => ({ chatCompletionPercent: percent })),
}));
