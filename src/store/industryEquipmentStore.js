import { create } from "zustand";
import api from "../utils/apiClient";

export const useIndustryEquipmentStore = create((set) => ({
  industries: [],
  industriesLoading: true,
  equipment: [],
  equipmentLoading: true,

  addIndustry: (industry) =>
    set((state) => ({
      industries: [...state.industries, industry],
    })),

  updateIndustry: (updatedIndustry) =>
    set((state) => ({
      industries: state.industries.map((item) => (item.id === updatedIndustry.id ? updatedIndustry : item)),
    })),

  deleteIndustry: (industryId) =>
    set((state) => ({
      industries: state.industries.filter((item) => item.id !== industryId),
    })),

  toggleIndustryVisibility: (industryId, visibility) =>
    set((state) => ({
      industries: state.industries.map((item) => (item.id === industryId ? { ...item, visibility } : item)),
    })),

  addEquipment: (equipment) =>
    set((state) => ({
      equipment: [...state.equipment, equipment],
    })),

  updateEquipment: (updatedEquipment) =>
    set((state) => ({
      equipment: state.equipment.map((item) => (item.id === updatedEquipment.id ? updatedEquipment : item)),
    })),

  deleteEquipment: (equipmentId) =>
    set((state) => ({
      equipment: state.equipment.filter((item) => item.id !== equipmentId),
    })),

  toggleEquipmentVisibility: (equipmentId, visibility) =>
    set((state) => ({
      equipment: state.equipment.map((item) => (item.id === equipmentId ? { ...item, visibility } : item)),
    })),

  fetchIndustries: async () => {
    try {
      set({ industriesLoading: true });
      const response = await api.get("/industry-equipment/admin/industries");
      set({
        industries: response.data || [],
        industriesLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch industries:", error);
      set({ industriesLoading: false });
    }
  },

  fetchEquipment: async () => {
    try {
      set({ equipmentLoading: true });
      const response = await api.get("/industry-equipment/admin/equipments");
      set({
        equipment: response.data || [],
        equipmentLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch equipment:", error);
      set({ equipmentLoading: false });
    }
  },
}));
