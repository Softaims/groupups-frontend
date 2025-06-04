import { Search, Cpu } from "lucide-react";
import AISnippetsList from "./AISnippetsList";
import AISnippetForm from "./AISnippetForm";
import ConfirmationModal from "../../global/ConfirmationModal";
import EquipmentSelector from "./EquipmentSelector";
import EmptyState from "./EmptyState";
import EquipmentEmptyState from "../admin-questions-components/EquipmentEmptyState";
import AdminAISnippetsHeader from "./AdminAISnippetsHeader";
import { useAISnippets } from "../../../hooks/useAISnippets";
import { useIndustryEquipmentStore } from "../../../store/industryEquipmentStore";

const AdminAISnippetsMain = () => {
  const { equipmentLoading, equipment } = useIndustryEquipmentStore();
  const {
    selectedIndustry,
    selectedEquipment,
    snippets,
    isLoading,
    industries,
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
  } = useAISnippets();

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminAISnippetsHeader selectedEquipment={selectedEquipment} onAddClick={handleAddClick} isLoading={isLoading} />

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
                    placeholder="Search AI snippets..."
                    className="w-full rounded-md bg-[#0c0f12] pl-10 py-2 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">Loading AI snippets...</p>
                  </div>
                ) : snippets?.length > 0 ? (
                  <div className="mb-2">
                    <h3 className="text-white font-medium mb-3">
                      AI Snippets ({snippets.length})<span className="text-sm font-normal text-gray-400 ml-2">Drag to reorder</span>
                    </h3>
                    <AISnippetsList
                      snippets={snippets}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      onReorder={handleReorderSnippets}
                      isLoading={isLoading}
                    />
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No AI snippets found matching "{searchQuery}"</p>
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
        <AISnippetForm
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          errors={formErrors}
          equipment={selectedEquipment}
          isEditMode={!!selectedSnippet}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && selectedSnippet && (
        <ConfirmationModal
          type="delete"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteSnippet}
          title="Delete AI Snippet"
          message={`Are you sure you want to delete this AI snippet? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default AdminAISnippetsMain; 