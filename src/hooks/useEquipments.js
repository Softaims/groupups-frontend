import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";
import { adminEquipmentSchema } from "../validations/adminEquipmentSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useEquipments = () => {
  const { equipment, equipmentLoading, addEquipment, updateEquipment, deleteEquipment, toggleEquipmentVisibility } =
    useIndustryEquipmentStore();
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry_id: "",
    visibility: true,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleAddNew = () => {
    setFormData({
      name: "",
      industry_id: "",
      visibility: true,
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
      toast.success(`Equipment ${equipment.visibility ? "hidden from" : "made visible to"} users`);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/industry-equipment/equipments/${selectedEquipment.id}`);
      deleteEquipment(selectedEquipment.id);
      setShowDeleteModal(false);
      setSelectedEquipment(null);
      toast.success("Equipment deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    try {
      if (showAddModal) {
        const response = await api.post("/industry-equipment/create-equipment", formData);
        addEquipment(response.data);
        toast.success("Equipment added successfully");
      } else {
        const response = await api.patch(`/industry-equipment/equipments/${selectedEquipment.id}`, formData);
        updateEquipment(response.data);
        toast.success("Equipment updated successfully");
      }
      handleCloseModal();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.message || "Something went wrong");
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
    });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setSelectedEquipment(null);
    setShowDeleteModal(false);
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
    confirmDelete,
    handleEdit,
    handleFormChange,
    handleSubmit,
    handleCloseModal,
    handleCloseDeleteModal,
    handleAddNew,
  };
};
