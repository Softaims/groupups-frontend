import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";
import { adminEquipmentSchema } from "../validations/adminEquipmentSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useEquipments = () => {
  const {
    equipment,
    equipmentLoading,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    toggleEquipmentVisibility,
    toggleProductVisibility, // add this to your store for best results
  } = useIndustryEquipmentStore();
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry_id: "",
    visibility: true,
    maxProducts: undefined,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleAddNew = () => {
    setFormData({
      name: "",
      industry_id: "",
      visibility: true,
      maxProducts: undefined,
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const handleEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      name: equipment.name,
      industry_id: equipment.industry_id,
      visibility: equipment.visibility ?? true,
      maxProducts: equipment.maxProducts,
    });
    setShowEditModal(true);
    setFormErrors({});
  };

  const handleDelete = (equipment) => {
    setSelectedEquipment(equipment);
    setShowDeleteModal(true);
  };

  const handleToggleVisibility = async (equipment) => {
    try {
      await api.patch(`/industry-equipment/equipments/${equipment.id}`, {
        visibility: !equipment.visibility,
      });
      toggleEquipmentVisibility(equipment.id, !equipment.visibility);
      toast.success(
        `Equipment ${
          equipment.visibility ? "hidden from" : "made visible to"
        } users`
      );
    } catch {
      toast.error("Unable to update visibility at the moment");
    }
  };
  const handleToggleProductVisibility = async (equipment) => {
    try {
      await api.patch(`/industry-equipment/equipments/${equipment.id}`, {
        productsVisibility: !equipment.productsVisibility,
      });
      toggleProductVisibility(equipment.id, !equipment.productsVisibility);
      toast.success(
        `Product visibility ${
          equipment.productsVisibility ? "disabled" : "enabled"
        }`
      );
    } catch {
      toast.error("Unable to update product visibility at the moment");
    }
  };
  const confirmDelete = async () => {
    try {
      await api.delete(
        `/industry-equipment/equipments/${selectedEquipment.id}`
      );
      deleteEquipment(selectedEquipment.id);
      setShowDeleteModal(false);
      setSelectedEquipment(null);
      toast.success("Equipment deleted successfully");
    } catch {
      toast.error("Failed to delete equipment");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "maxProducts"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationErrors = validateForm(adminEquipmentSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    // Only send maxProducts if user provided a value
    const payload = { ...formData };
    if (payload.maxProducts === undefined || payload.maxProducts === "") {
      delete payload.maxProducts;
    }

    try {
      if (showAddModal) {
        const response = await api.post(
          "/industry-equipment/create-equipment",
          payload
        );
        addEquipment(response.data);
        toast.success("Equipment added successfully");
      } else {
        const response = await api.patch(
          `/industry-equipment/equipments/${selectedEquipment.id}`,
          payload
        );
        updateEquipment(response.data);
        toast.success("Equipment updated successfully");
      }
      handleCloseModal();
    } catch (error) {
      console.log("error", error);
      // Try to show a specific error message if available
      let errorMsg = showAddModal
        ? "Failed to add equipment"
        : "Failed to update equipment";
      if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      } else if (typeof error?.error === "string") {
        errorMsg = error.error;
      } else if (typeof error === "string") {
        errorMsg = error;
      }
      toast.error(errorMsg);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedEquipment(null);
    setFormData({
      name: "",
      industry_id: "",
      visibility: true,
      maxProducts: undefined,
    });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setSelectedEquipment(null);
    setShowDeleteModal(false);
  };

  const handleReorder = async (newItems, industryId) => {
    if (!industryId) return;
    await api.post("/industry-equipment/reorder-equipments", {
      industryId,
      orderedIds: newItems.map((eq) => eq.id),
    });
  };

  return {
    equipment,
    equipmentLoading,
    showDeleteModal,
    selectedEquipment,
    showAddModal,
    showEditModal,
    formData,
    formErrors,
    handleDelete,
    handleToggleVisibility,
    handleToggleProductVisibility,
    confirmDelete,
    handleEdit,
    handleFormChange,
    handleSubmit,
    handleCloseModal,
    handleCloseDeleteModal,
    handleAddNew,
    handleReorder,
  };
};
