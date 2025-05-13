import { create } from "zustand";

export const useSocketStore = create((set) => ({
  isConnected: false,
  setIsConnected: (status) => set({ isConnected: status }),
  connectionStatus: "connecting",
  setConnectionStatus: (status) => set({ connectionStatus: status }),
}));
