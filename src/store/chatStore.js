import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [],
  recommendedProducts: null,
  isInitiated: false,
  isLLMLoading: false,
  isChatCompleted: false,
  streamingMessageId: null,

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
  
  setStreamingMessageId: (messageId) => set({ streamingMessageId: messageId }),
  clearStreamingMessageId: () => set({ streamingMessageId: null }),
}));
