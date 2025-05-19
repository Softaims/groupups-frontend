import { useState, useEffect } from "react";
import { Search, Plus, Cpu } from "lucide-react";
import QuestionsList from "./QuestionsList";
import QuestionForm from "./QuestionsForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EquipmentSelector from "./EquipmentSelector";
import EmptyState from "./EmptyState";

const AdminQuestionsMain = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

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

  // Update questions when equipment is selected
  useEffect(() => {
    if (selectedEquipment) {
      const filteredQuestions = sampleQuestions
        .filter((q) => q.equipmentId === selectedEquipment.id)
        .sort((a, b) => a.priority - b.priority);
      setQuestions(filteredQuestions);
    } else {
      setQuestions([]);
    }
  }, [selectedEquipment]);

  // Filter questions based on search query
  const filteredQuestions = questions.filter((q) => {
    return q.questionText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleAddQuestion = (questionData) => {
    const newQuestion = {
      id: Math.max(0, ...questions.map((q) => q.id)) + 1,
      equipmentId: selectedEquipment.id,
      ...questionData,
      priority: questions.length + 1,
      createdAt: new Date().toISOString(),
    };

    setQuestions([...questions, newQuestion]);
    setIsAddModalOpen(false);
  };

  const handleEditQuestion = (questionData) => {
    const updatedQuestions = questions.map((q) => (q.id === questionData.id ? { ...q, ...questionData } : q));
    setQuestions(updatedQuestions);
    setIsEditModalOpen(false);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = questions.filter((q) => q.id !== selectedQuestion.id);
    const reorderedQuestions = updatedQuestions.sort((a, b) => a.priority - b.priority).map((q, index) => ({ ...q, priority: index + 1 }));

    setQuestions(reorderedQuestions);
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (question) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleReorderQuestions = (reorderedQuestions) => {
    const updatedQuestions = reorderedQuestions.map((q, index) => ({
      ...q,
      priority: index + 1,
    }));
    setQuestions(updatedQuestions);
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
              onClick={() => setIsAddModalOpen(true)}
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
              <EmptyState onAddClick={() => setIsAddModalOpen(true)} />
            )}
          </div>
        )}
      </div>

      {isAddModalOpen && selectedEquipment && (
        <QuestionForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddQuestion}
          equipment={selectedEquipment}
          mode="add"
        />
      )}

      {isEditModalOpen && selectedQuestion && (
        <QuestionForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditQuestion}
          equipment={selectedEquipment}
          question={selectedQuestion}
          mode="edit"
        />
      )}

      {isDeleteModalOpen && selectedQuestion && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteQuestion}
          questionText={selectedQuestion.questionText}
        />
      )}
    </main>
  );
};

export default AdminQuestionsMain;
