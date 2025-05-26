import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [],
  recommendedProducts: null,
  isInitiated: false,
  isLLMLoading: false,
  isChatCompleted: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),

  removeLastMessage: () =>
    set((state) => ({
      messages: state.messages.slice(0, -1),
    })),

  setRecommendedProducts: (products) => set({ recommendedProducts: products }),

  setIsInitiated: (isInitiated) => set({ isInitiated: isInitiated }),
  setIsLLMLoading: (isLLMLoading) => set({ isLLMLoading: isLLMLoading }),
  setIsChatCompleted: (isChatCompleted) => set({ isChatCompleted: isChatCompleted }),
}));
