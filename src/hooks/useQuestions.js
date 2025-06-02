import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";
import { simpleQuestionSchema, multipleChoiceSchema } from "../validations/adminQuestionSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useQuestions = () => {
  const { industries, equipment } = useIndustryEquipmentStore();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "open_ended",
    required: true,
    youtube_link: "",
    options: [{ id: 1, text: "" }],
    allowMultipleSelection: false,
    equipment_id: null,
    context: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchQuestions = async (selectedEquipment) => {
    if (!selectedEquipment?.id) {
      setQuestions(null);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get(`/questions/questions?equipmentId=${selectedEquipment.id}`);
      console.log('Fetched questions:', response.data);
      setQuestions(response.data || []);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setQuestions([]);
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
      fetchQuestions(equipment);
    }
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      question_type: type,
      options:
        type === "multiple_choice"
          ? prev.options.length >= 2
            ? prev.options
            : [
                { id: 1, text: "" },
                { id: 2, text: "" },
              ]
          : [{ id: 1, text: "" }],
      allowMultipleSelection: type === "multiple_choice" ? prev.allowMultipleSelection : false,
    }));
    if (formErrors.question_type) {
      setFormErrors((prev) => ({ ...prev, question_type: "" }));
    }
  };

  const addOption = () => {
    setFormData((prev) => {
      const newId = Math.max(0, ...prev.options.map((o) => o.id)) + 1;
      return {
        ...prev,
        options: [...prev.options, { id: newId, text: "" }],
      };
    });
    if (formErrors.options) {
      setFormErrors((prev) => ({ ...prev, options: "" }));
    }
  };

  const removeOption = (id) => {
    setFormData((prev) => {
      if (prev.options.length <= 2) {
        setFormErrors((prev) => ({ ...prev, options: "Multiple choice questions require at least two options" }));
        return prev;
      }
      return {
        ...prev,
        options: prev.options.filter((option) => option.id !== id),
      };
    });
  };

  const updateOption = (id, text) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) => (option.id === id ? { ...option, text } : option)),
    }));
    if (formErrors.options) {
      setFormErrors((prev) => ({ ...prev, options: "" }));
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

  const addContextItem = () => {
    setFormData((prev) => ({
      ...prev,
      context: [...prev.context, ""],
    }));
  };

  const removeContextItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      context: prev.context.filter((_, i) => i !== index),
    }));
  };

  const updateContextItem = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      context: prev.context.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddClick = () => {
    setSelectedQuestion(null);
    setFormData({
      question_text: "",
      question_type: "open_ended",
      required: true,
      youtube_link: "",
      options: [{ id: 1, text: "" }],
      allowMultipleSelection: false,
      equipment_id: selectedEquipment.id,
      context: [],
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    setFormData({
      id: question.id,
      question_text: question.question_text || "",
      question_type: question.question_type || "open_ended",
      required: question.required || true,
      youtube_link: question.youtube_link || "",
      options: question.question_type === "multiple_choice" ? [...(question.options || [])] : [{ id: 1, text: "" }],
      allowMultipleSelection: question.question_type === "multiple_choice" ? question.allowMultipleSelection || false : false,
      equipment_id: selectedEquipment.id,
      context: question.context || [],
    });
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (question) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationData = {
      ...formData,
      equipment_id: selectedEquipment.id,
    };
    const schema = formData.question_type === "multiple_choice" ? multipleChoiceSchema : simpleQuestionSchema;
    const validationErrors = validateForm(schema, validationData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    try {
      if (selectedQuestion) {
        const response = await api.patch(`/questions/question/${selectedQuestion.id}`, validationData);
        const updatedQuestions = questions.map((q) => (q.id === selectedQuestion.id ? response.data : q));
        handleReorderQuestions(updatedQuestions);
        toast.success("Question updated successfully");
      } else {
        const response = await api.post("/questions/create-question", validationData);
        const updatedQuestions = [...questions, response.data];
        setQuestions(updatedQuestions);
        handleReorderQuestions(updatedQuestions);
        toast.success("Question added successfully");
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error?.message || "Failed to save question");
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await api.delete(`/questions/question/${selectedQuestion.id}`);
      setQuestions((prev) => prev.filter((q) => q.id !== selectedQuestion.id));
      setIsDeleteModalOpen(false);
      setSelectedQuestion(null);
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to delete question");
      console.error("Error deleting question:", error);
    }
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setSelectedQuestion(null);
    setFormData({
      question_text: "",
      question_type: "open_ended",
      required: false,
      youtube_link: "",
      options: [{ id: 1, text: "" }],
      allowMultipleSelection: false,
      equipment_id: null,
      context: [],
    });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleReorderQuestions = async (reorderedQuestions) => {
    const questions = reorderedQuestions?.map((item) => {
      return item.id;
    });

    const formData = { questions, equipment_id: selectedEquipment?.id };
    try {
      await api.post(`/questions/reset-questions`, formData);
      setQuestions(reorderedQuestions);
    } catch (error) {
      console.error("Error reordering questions:", error);
    }
  };

  const filteredQuestions = questions?.filter((q) => {
    return q.question_text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return {
    selectedIndustry,
    selectedEquipment,
    questions: filteredQuestions,
    isLoading,
    industries,
    equipment,
    isFormModalOpen,
    isDeleteModalOpen,
    selectedQuestion,
    formData,
    formErrors,
    searchQuery,

    handleIndustrySelect,
    handleEquipmentSelect,
    handleFormChange,
    handleTypeChange,
    addOption,
    removeOption,
    updateOption,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSubmit,
    handleDeleteQuestion,
    handleCloseModal,
    handleCloseDeleteModal,
    handleReorderQuestions,
    setSearchQuery,
    addContextItem,
    removeContextItem,
    updateContextItem,
  };
};
