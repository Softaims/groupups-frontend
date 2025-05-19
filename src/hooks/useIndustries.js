import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";
import { adminIndustrySchema } from "../validations/adminIndustrySchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useIndustries = () => {
  const { industries, setIndustries, industriesLoading } = useIndustryEquipmentStore();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", industry_image: null, visibility: true });
  const [previewImage, setPreviewImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleAddNew = () => {
    setFormData({ name: "", industry_image: null, visiblity: true });
    setPreviewImage(null);
    setFormErrors({});
    setShowAddModal(true);
  };

  const handleEdit = (industry) => {
    setSelectedIndustry(industry);
    setFormData({
      name: industry.name,
      industry_image: industry.industry_image,
      visibility: industry.visibility ?? true,
    });
    setPreviewImage(industry.industry_image);
    setShowEditModal(true);
    setFormErrors({});
  };

  const handleDelete = (industry) => {
    setSelectedIndustry(industry);
    setShowDeleteModal(true);
  };

  const handleToggleVisibility = async (industry) => {
    try {
      await api.patch(`/industry-equipment/industries/${industry.id}`, {
        visibility: !industry.visibility,
      });
      setIndustries(
        industries.map((i) =>
          i.id === industry.id
            ? {
                ...i,
                visibility: !i.visibility,
              }
            : i
        )
      );
      toast.success(`Industry ${industry.visibility ? "hidden from" : "made visible to"} users`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/industry-equipment/industries/${selectedIndustry.id}`);
      setIndustries(industries.filter((i) => i.id !== selectedIndustry.id));
      setShowDeleteModal(false);
      setSelectedIndustry(null);
      toast.success("Industry deleted successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        industry_image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
      if (formErrors.industry_image) {
        setFormErrors((prev) => ({ ...prev, industry_image: "" }));
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, industry_image: null }));
    if (formErrors.industry_image) {
      setFormErrors((prev) => ({ ...prev, industry_image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationErrors = validateForm(adminIndustrySchema, {
      name: formData.name,
      industry_image: formData.industry_image || previewImage,
      visibility: formData.visibility,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      if (showAddModal) {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("visibility", formData.visibility);
        formDataToSend.append("industry_image", formData.industry_image);
        const response = await api.post("/industry-equipment/create-industry", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIndustries([...industries, response.data]);
        toast.success("Industry added successfully");
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("visibility", formData.visibility);

        if (formData.industry_image instanceof File) {
          formDataToSend.append("industry_image", formData.industry_image);
        }

        const response = await api.patch(`/industry-equipment/industries/${selectedIndustry.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedIndustry = response.data;
        setIndustries(industries.map((i) => (i.id === selectedIndustry.id ? updatedIndustry : i)));
        toast.success("Industry updated successfully");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedIndustry(null);
    setFormData({ name: "", industry_image: null, visibility: true });
    setPreviewImage(null);
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setSelectedIndustry(null);
    setShowDeleteModal(false);
  };

  return {
    industriesLoading,
    industries,
    showDeleteModal,
    selectedIndustry,
    showAddModal,
    showEditModal,
    formData,
    previewImage,
    formErrors,

    handleDelete,
    handleToggleVisibility,
    confirmDelete,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    handleCloseModal,
    handleCloseDeleteModal,
    handleAddNew,
  };
};
