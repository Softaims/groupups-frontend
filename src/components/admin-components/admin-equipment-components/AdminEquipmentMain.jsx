import { useState, useEffect } from "react";
import EquipmentTable from "./EquipmentTable";
import EquipmentModal from "./EquipmentModal";
import ConfirmationModal from "../../global/ConfirmationModal";
import { useEquipments } from "../../../hooks/useEquipments";
import { useIndustryEquipmentStore } from "../../../store/industryEquipmentStore";
import AdminEquipmentHeader from "./AdminEquipmentHeader";
import EquipmentSearchFilter from "./EquipmentSearchFilter";
import SkeletonEquipmentTable from "./SkeletonEquipmentTable";
import IndustryEmptyState from "./IndustryEmptyState";

const AdminEquipmentMain = () => {
  const { industries, industriesLoading } = useIndustryEquipmentStore();
  const {
    equipment,
    equipmentLoading,
    showDeleteModal,
    selectedEquipment,
    showAddModal,
    showEditModal,
    formData,
    formErrors,
    handleToggleProductVisibility,
    handleDelete,
    handleToggleVisibility,
    confirmDelete,
    handleEdit,
    handleFormChange,
    handleSubmit,
    handleCloseModal,
    handleCloseDeleteModal,
    handleAddNew,
    handleReorder,
  } = useEquipments();
  const [selectedIndustry, setSelectedIndustry] = useState(() =>
    industries && industries.length > 0 ? industries[0].id : ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (industries && industries.length > 0) {
      if (
        !selectedIndustry ||
        !industries.some((ind) => ind.id === selectedIndustry)
      ) {
        setSelectedIndustry(industries[0].id);
      }
    }
  }, [industries, selectedIndustry]);

  const filteredEquipment = equipment?.filter((item) => {
    const matchesIndustry = item.industry_id === selectedIndustry;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminEquipmentHeader
          handleAddNew={handleAddNew}
          industriesLength={industries?.length || 0}
        />

        {!industriesLoading && industries?.length === 0 ? (
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
            <IndustryEmptyState />
          </div>
        ) : (
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
            <EquipmentSearchFilter
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              selectedIndustry={selectedIndustry}
              onIndustryChange={(e) => {
                setSelectedIndustry(e.target.value);
              }}
              industries={industries}
            />
            {equipmentLoading ? (
              <SkeletonEquipmentTable />
            ) : filteredEquipment?.length > 0 ? (
              <EquipmentTable
                equipment={filteredEquipment}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
                onToggleProductVisibility={handleToggleProductVisibility}
                industries={industries}
                onReorder={handleReorder}
                industryId={selectedIndustry}
              />
            ) : searchQuery ? (
              <div className="text-center py-10">
                <p className="text-gray-400">
                  No equipment found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-[#3CBFAE] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">
                  No equipment available under this Industry. Click the "Add
                  Equipment" button to get started.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          type="delete"
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDelete}
          title="Delete Equipment"
          message={`Are you sure you want to delete "${selectedEquipment?.name}"? This action cannot be undone.`}
        />
      )}

      <EquipmentModal
        isOpen={showAddModal || showEditModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        errors={formErrors}
        isEditMode={showEditModal}
        industries={industries}
      />
    </main>
  );
};

export default AdminEquipmentMain;
