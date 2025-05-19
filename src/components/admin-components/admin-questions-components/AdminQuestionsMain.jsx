import { useState, useEffect } from "react";
import { Search, Plus, Cpu } from "lucide-react";
import QuestionsList from "./QuestionsList";
import QuestionForm from "./QuestionsForm";
import ConfirmationModal from "../../global/ConfirmationModal";
import EquipmentSelector from "./EquipmentSelector";
import EmptyState from "./EmptyState";

const AdminQuestionsMain = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    questionText: "",
    type: "open_ended",
    required: false,
    youtubeUrl: "",
    options: [{ id: 1, text: "" }],
    allowMultiple: false,
    equipmentId: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const industries = [
    { id: 1, name: "Dental" },
    { id: 2, name: "Veterinarian" },
    { id: 3, name: "Vision Professional" },
  ];

  const equipment = [
    { id: 1, name: "CBCT", industryId: 1, industryName: "Dental" },
    { id: 2, name: "Dental Chairs", industryId: 1, industryName: "Dental" },
    { id: 3, name: "2D Pano", industryId: 1, industryName: "Dental" },
    { id: 4, name: "X-Ray Machine", industryId: 2, industryName: "Veterinarian" },
    { id: 5, name: "Ultrasound", industryId: 2, industryName: "Veterinarian" },
    { id: 6, name: "Eye Examination Device", industryId: 3, industryName: "Vision Professional" },
  ];

  const sampleQuestions = [
    {
      id: 1,
      equipmentId: 1,
      questionText: "What is the warranty period for this equipment?",
      type: "open_ended",
      required: true,
      priority: 1,
      createdAt: "2023-10-15T10:30:00Z",
    },
    {
      id: 2,
      equipmentId: 1,
      questionText: "What are the power requirements?",
      type: "multiple_choice",
      options: [
        { id: 1, text: "110V" },
        { id: 2, text: "220V" },
        { id: 3, text: "Both 110V and 220V" },
      ],
      allowMultiple: false,
      required: true,
      priority: 2,
      createdAt: "2023-10-16T09:15:00Z",
    },
    {
      id: 3,
      equipmentId: 1,
      questionText: "Please acknowledge that this equipment requires annual maintenance.",
      type: "statement",
      required: true,
      priority: 3,
      createdAt: "2023-10-17T14:45:00Z",
    },
    {
      id: 4,
      equipmentId: 1,
      questionText: "Please upload your floor plan for installation planning.",
      type: "file_upload",
      required: false,
      priority: 4,
      createdAt: "2023-10-18T11:20:00Z",
    },
    {
      id: 5,
      equipmentId: 1,
      questionText: "Watch the following video about equipment installation and provide your feedback.",
      type: "open_ended",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      required: false,
      priority: 5,
      createdAt: "2023-10-19T16:05:00Z",
    },
    {
      id: 6,
      equipmentId: 2,
      questionText: "What is the maximum weight capacity you need?",
      type: "multiple_choice",
      options: [
        { id: 1, text: "Up to 250 lbs" },
        { id: 2, text: "Up to 350 lbs" },
        { id: 3, text: "Up to 450 lbs" },
        { id: 4, text: "Over 450 lbs" },
      ],
      allowMultiple: false,
      required: true,
      priority: 1,
      createdAt: "2023-10-18T11:20:00Z",
    },
    {
      id: 7,
      equipmentId: 2,
      questionText: "Which features are important to you? (Select all that apply)",
      type: "multiple_choice",
      options: [
        { id: 1, text: "Electric height adjustment" },
        { id: 2, text: "Programmable positions" },
        { id: 3, text: "Integrated water system" },
        { id: 4, text: "Armrest controls" },
        { id: 5, text: "Headrest adjustment" },
      ],
      allowMultiple: true,
      required: true,
      priority: 2,
      createdAt: "2023-10-19T16:05:00Z",
    },
  ];

  useEffect(() => {
    setAllQuestions(sampleQuestions);
  }, []);

  useEffect(() => {
    if (selectedEquipment) {
      const filteredQuestions = allQuestions
        .filter((q) => q.equipmentId === selectedEquipment.id)
        .sort((a, b) => a.priority - b.priority);
      setQuestions(filteredQuestions);
    } else {
      setQuestions([]);
    }
  }, [selectedEquipment, allQuestions]);

  const filteredQuestions = questions.filter((q) => {
    return q.questionText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (questionData) => {
    if (questionData.id) {
      // Edit mode
      const updatedQuestions = allQuestions.map((q) => {
        if (q.id === questionData.id) {
          const updatedQuestion = {
            ...q,
            questionText: questionData.questionText,
            type: questionData.type,
            required: questionData.required,
            youtubeUrl: questionData.youtubeUrl,
            ...(questionData.type === "multiple_choice" && {
              options: questionData.options,
              allowMultiple: questionData.allowMultiple,
            }),
            ...(questionData.type !== "multiple_choice" && {
              options: undefined,
              allowMultiple: undefined,
            }),
          };
          return updatedQuestion;
        }
        return q;
      });
      setAllQuestions(updatedQuestions);
    } else {
      // Add mode
      const newQuestion = {
        id: Math.max(0, ...allQuestions.map((q) => q.id)) + 1,
        equipmentId: selectedEquipment.id,
        ...questionData,
        priority: questions.length + 1,
        createdAt: new Date().toISOString(),
      };
      setAllQuestions([...allQuestions, newQuestion]);
    }
    handleCloseModal();
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = allQuestions.filter((q) => q.id !== selectedQuestion.id);
    const reorderedQuestions = updatedQuestions
      .filter((q) => q.equipmentId === selectedEquipment.id)
      .sort((a, b) => a.priority - b.priority)
      .map((q, index) => ({ ...q, priority: index + 1 }));

    const finalQuestions = updatedQuestions.map((q) => {
      if (q.equipmentId === selectedEquipment.id) {
        const reorderedQ = reorderedQuestions.find((rq) => rq.id === q.id);
        return reorderedQ ? { ...q, priority: reorderedQ.priority } : q;
      }
      return q;
    });

    setAllQuestions(finalQuestions);
    setIsDeleteModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    setFormData({
      id: question.id,
      questionText: question.questionText || "",
      type: question.type || "open_ended",
      required: question.required || false,
      youtubeUrl: question.youtubeUrl || "",
      options: question.type === "multiple_choice" ? [...(question.options || [])] : [{ id: 1, text: "" }],
      allowMultiple: question.type === "multiple_choice" ? question.allowMultiple || false : false,
      equipmentId: selectedEquipment.id,
    });
    setIsFormModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedQuestion(null);
    setFormData({
      questionText: "",
      type: "open_ended",
      required: false,
      youtubeUrl: "",
      options: [{ id: 1, text: "" }],
      allowMultiple: false,
      equipmentId: selectedEquipment.id,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setSelectedQuestion(null);
    setFormData({
      questionText: "",
      type: "open_ended",
      required: false,
      youtubeUrl: "",
      options: [{ id: 1, text: "" }],
      allowMultiple: false,
      equipmentId: null,
    });
    setFormErrors({});
  };

  const handleDeleteClick = (question) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleReorderQuestions = (reorderedQuestions) => {
    const updatedQuestions = allQuestions.map((q) => {
      if (q.equipmentId === selectedEquipment.id) {
        const reorderedQ = reorderedQuestions.find((rq) => rq.id === q.id);
        return reorderedQ ? { ...q, priority: reorderedQ.priority } : q;
      }
      return q;
    });
    setAllQuestions(updatedQuestions);
  };

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Questions Management</h1>
            <p className="text-gray-400">
              {selectedEquipment ? `Managing questions for ${selectedEquipment.name}` : "Select equipment to manage its questions"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAddClick}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedEquipment}
            >
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        <EquipmentSelector
          industries={industries}
          equipment={equipment}
          selectedEquipment={selectedEquipment}
          onSelect={handleEquipmentSelect}
        />

        {selectedEquipment && (
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md">
                <Cpu className="h-5 w-5 text-[#3CBFAE]" />
                <div>
                  <h3 className="font-medium text-white">{selectedEquipment.name}</h3>
                  <p className="text-sm text-gray-400">{selectedEquipment.industryName}</p>
                </div>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search questions..."
                className="w-full rounded-md bg-[#0c0f12] pl-10 py-2 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredQuestions.length > 0 ? (
              <div className="mb-2">
                <h3 className="text-white font-medium mb-3">
                  Questions ({filteredQuestions.length})<span className="text-sm font-normal text-gray-400 ml-2">Drag to reorder</span>
                </h3>
                <QuestionsList
                  questions={filteredQuestions}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onReorder={handleReorderQuestions}
                />
              </div>
            ) : searchQuery ? (
              <div className="text-center py-10">
                <p className="text-gray-400">No questions found matching "{searchQuery}"</p>
                <button onClick={() => setSearchQuery("")} className="mt-2 text-[#3CBFAE] hover:underline">
                  Clear search
                </button>
              </div>
            ) : (
              <EmptyState onAddClick={() => setIsFormModalOpen(true)} />
            )}
          </div>
        )}
      </div>

      {isFormModalOpen && selectedEquipment && (
        <QuestionForm
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          errors={formErrors}
          equipment={selectedEquipment}
          isEditMode={!!selectedQuestion}
        />
      )}

      {isDeleteModalOpen && selectedQuestion && (
        <ConfirmationModal
          type="delete"
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedQuestion(null);
          }}
          onConfirm={handleDeleteQuestion}
          title="Delete Question"
          message={`Are you sure you want to delete this question? This action cannot be undone.`}
          confirmText="Delete"
        />
      )}
    </main>
  );
};

export default AdminQuestionsMain;
