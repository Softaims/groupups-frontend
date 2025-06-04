import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";
import { aiSnippetSchema } from "../validations/adminAISnippetSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useAISnippets = () => {
  const { industries, equipment } = useIndustryEquipmentStore();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [snippets, setSnippets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    snippet_text: "",
    equipment_id: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchSnippets = async (selectedEquipment) => {
    if (!selectedEquipment?.id) {
      setSnippets(null);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get(`/train-ai/snippets/${selectedEquipment.id}`);
      setSnippets(response.data || []);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setSnippets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setSelectedEquipment(null);
  };

  const handleEquipmentSelect = (equipment) => {
    if (selectedEquipment?.id != equipment.id) {
      setSelectedEquipment(equipment);
      fetchSnippets(equipment);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  console.log("form data", formData);
  const handleAddClick = () => {
    setSelectedSnippet(null);
    setFormData({
      snippet_text: "",
      equipment_id: selectedEquipment.id,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleEditClick = (snippet) => {
    setSelectedSnippet(snippet);
    setFormData({
      snippet_text: snippet.snippet_text,
      equipment_id: selectedEquipment.id,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (snippet) => {
    setSelectedSnippet(snippet);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationData = {
      snippet_text: formData.snippet_text,
      equipment_id: selectedEquipment.id,
    };
    console.log("form data submit", formData);
    const validationErrors = validateForm(aiSnippetSchema, validationData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    try {
      if (selectedSnippet) {
        const response = await api.patch(`/train-ai/snippet/${selectedSnippet.id}`, validationData);
        const updatedSnippets = snippets.map((s) => (s.id === selectedSnippet.id ? response.data : s));
        handleReorderSnippets(updatedSnippets);
        toast.success("AI snippet updated successfully");
      } else {
        const response = await api.post("/train-ai/create-snippet", validationData);
        const updatedSnippets = [...snippets, response.data];
        handleReorderSnippets(updatedSnippets);
        toast.success("AI snippet added successfully");
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error?.message || "Failed to save AI snippet");
      console.error("Error saving AI snippet:", error);
    }
  };

  const handleDeleteSnippet = async () => {
    try {
      await api.delete(`/train-ai/snippet/${selectedSnippet.id}`);
      setSnippets((prev) => prev.filter((s) => s.id !== selectedSnippet.id));
      setIsDeleteModalOpen(false);
      setSelectedSnippet(null);
      toast.success("AI snippet deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to delete AI snippet");
      console.error("Error deleting AI snippet:", error);
    }
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setSelectedSnippet(null);
    setFormData({
      snippet_text: "",
      equipment_id: null,
    });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSnippet(null);
  };

  const handleReorderSnippets = async (reorderedSnippets) => {
    const snippets = reorderedSnippets?.map((item) => {
      return item.id;
    });

    const formData = { snippets, equipment_id: selectedEquipment?.id };
    try {
      await api.post(`/train-ai/reset-snippets`, formData);
      setSnippets(reorderedSnippets);
    } catch (error) {
      console.error("Error reordering AI snippets:", error);
    }
  };

  const filteredSnippets = snippets?.filter((s) => {
    return s.snippet_text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return {
    selectedIndustry,
    selectedEquipment,
    snippets: filteredSnippets,
    isLoading,
    industries,
    equipment,
    isFormModalOpen,
    isDeleteModalOpen,
    selectedSnippet,
    formData,
    formErrors,
    searchQuery,
    handleIndustrySelect,
    handleEquipmentSelect,
    handleFormChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSubmit,
    handleDeleteSnippet,
    handleCloseModal,
    handleCloseDeleteModal,
    handleReorderSnippets,
    setSearchQuery,
  };
};
