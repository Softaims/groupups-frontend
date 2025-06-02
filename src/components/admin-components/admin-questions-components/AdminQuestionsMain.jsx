import { Search, Cpu } from "lucide-react";
import QuestionsList from "./QuestionsList";
import QuestionForm from "./QuestionsForm";
import ConfirmationModal from "../../global/ConfirmationModal";
import EquipmentSelector from "./EquipmentSelector";
import EmptyState from "./EmptyState";
import EquipmentEmptyState from "./EquipmentEmptyState";
import AdminQuestionsHeader from "./AdminQuestionsHeader";
import { useQuestions } from "../../../hooks/useQuestions";
import { useIndustryEquipmentStore } from "../../../store/industryEquipmentStore";

const AdminQuestionsMain = () => {
  const { equipmentLoading, equipment } = useIndustryEquipmentStore();
  const {
    selectedIndustry,
    selectedEquipment,
    questions,
    isLoading,
    industries,
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
  } = useQuestions();

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminQuestionsHeader selectedEquipment={selectedEquipment} onAddClick={handleAddClick} isLoading={isLoading} />

        {!equipmentLoading && equipment?.length === 0 ? (
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
            <EquipmentEmptyState />
          </div>
        ) : (
          <>
            <EquipmentSelector
              industries={industries}
              equipment={equipment}
              selectedIndustry={selectedIndustry}
              selectedEquipment={selectedEquipment}
              onIndustrySelect={handleIndustrySelect}
              onEquipmentSelect={handleEquipmentSelect}
              isLoading={isLoading}
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

                {isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">Loading questions...</p>
                  </div>
                ) : questions?.length > 0 ? (
                  <div className="mb-2">
                    <h3 className="text-white font-medium mb-3">
                      Questions ({questions.length})<span className="text-sm font-normal text-gray-400 ml-2">Drag to reorder</span>
                    </h3>
                    <QuestionsList
                      questions={questions}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      onReorder={handleReorderQuestions}
                      isLoading={isLoading}
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
                  <EmptyState onAddClick={handleAddClick} />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {isFormModalOpen && selectedEquipment && (
        <QuestionForm
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          handleTypeChange={handleTypeChange}
          addOption={addOption}
          removeOption={removeOption}
          updateOption={updateOption}
          errors={formErrors}
          equipment={selectedEquipment}
          isEditMode={!!selectedQuestion}
          isLoading={isLoading}
          addContextItem={addContextItem}
          removeContextItem={removeContextItem}
          updateContextItem={updateContextItem}
        />
      )}

      {isDeleteModalOpen && selectedQuestion && (
        <ConfirmationModal
          type="delete"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteQuestion}
          title="Delete Question"
          message={`Are you sure you want to delete this question? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default AdminQuestionsMain;
