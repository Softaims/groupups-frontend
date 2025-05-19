import { create } from "zustand";
import api from "../utils/apiClient";

export const useIndustryEquipmentStore = create((set) => ({
  industries: [],
  industriesLoading: true,
  equipment: [],

  setIndustries: (industries) => set({ industries }),
  setEquipment: (equipment) => set({ equipment }),

  fetchIndustries: async () => {
    try {
      set({ industriesLoading: true });
      const response = await api.get("/industry-equipment/industries");
      set({
        industries: response.data || [],
        industriesLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch industries:", error);
      set({ industriesLoading: false });
    } finally {
      set({ industriesLoading: false });
    }
  },

  fetchEquipment: async () => {
    try {
      const response = await api.get("/industry-equipment/equipments");
      set({ equipment: response.data || [] });
    } catch (error) {
      console.error("Failed to fetch equipment:", error);
    }
  },
}));
