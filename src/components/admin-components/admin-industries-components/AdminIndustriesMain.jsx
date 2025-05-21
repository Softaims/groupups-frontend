import ConfirmationModal from "../../global/ConfirmationModal";
import IndustryCard from "./IndustryCard";
import IndustryModal from "./IndustryModal";
import AdminIndustriesHeader from "./AdminIndustriesHeader";
import SkeletonIndustryCard from "./SkeletonIndustryCard";
import EmptyState from "./EmptyState";
import { useIndustries } from "../../../hooks/useIndustries";

const AdminIndustriesMain = () => {
  const {
    industriesLoading,
    industries,
    showDeleteModal,
    showAddModal,
    showEditModal,
    selectedIndustry,
    formData,
    previewImage,
    formErrors,

    handleDelete,
    handleEdit,
    handleAddNew,
    confirmDelete,
    handleFormChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    handleToggleVisibility,
    handleCloseModal,
    handleCloseDeleteModal,
  } = useIndustries();

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminIndustriesHeader onAddNew={handleAddNew} />

        {industriesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3].map((_, index) => (
              <SkeletonIndustryCard key={index} />
            ))}
          </div>
        ) : industries?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
            <EmptyState onAddClick={handleAddNew} />
          </div>
        )}
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          type="delete"
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDelete}
          title="Delete Industry"
          message={`Are you sure you want to delete ${selectedIndustry?.name}? This action cannot be undone.`}
        />
      )}

      <IndustryModal
        isOpen={showAddModal || showEditModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        onImageChange={handleImageChange}
        previewImage={previewImage}
        onRemoveImage={handleRemoveImage}
        isEditMode={showEditModal}
        errors={formErrors}
      />
    </main>
  );
};

export default AdminIndustriesMain;
