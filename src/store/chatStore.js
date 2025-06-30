import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      recommendedProducts: null,
      isInitiated: false,
      isLLMLoading: false,
      isChatCompleted: false,
      streamingMessageId: null,
      hasHydrated: false,

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

      setIsInitiated: (isInitiated) => set({ isInitiated }),
      setIsLLMLoading: (isLLMLoading) => set({ isLLMLoading }),
      setIsChatCompleted: (isChatCompleted) => set({ isChatCompleted }),

      setStreamingMessageId: (messageId) => set({ streamingMessageId: messageId }),
      clearStreamingMessageId: () => set({ streamingMessageId: null }),

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        isLLMLoading: state.isLLMLoading,
        recommendedProducts: state.recommendedProducts, // ✅ now persisted
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.();
      },
    }
  )
);
