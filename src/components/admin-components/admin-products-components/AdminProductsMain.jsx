import { Search, Package } from "lucide-react";
import ProductsList from "./ProductsList";
import ProductForm from "./ProductForm";
import ConfirmationModal from "../../global/ConfirmationModal";
import EquipmentSelector from "../admin-questions-components/EquipmentSelector";
import EmptyState from "./EmptyState";
import EquipmentEmptyState from "../admin-questions-components/EquipmentEmptyState";
import AdminProductsHeader from "./AdminProductsHeader";
import { useProducts } from "../../../hooks/useProducts";
import { useIndustryEquipmentStore } from "../../../store/industryEquipmentStore";

const AdminProductsMain = () => {
  const { equipmentLoading, equipment } = useIndustryEquipmentStore();
  const {
    selectedIndustry,
    selectedEquipment,
    products,
    isLoading,
    industries,
    isFormModalOpen,
    isDeleteModalOpen,
    selectedProduct,
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
    handleDeleteProduct,
    handleCloseModal,
    handleCloseDeleteModal,
    setSearchQuery,
    handleImageChange,
    previewImage,
    handleRemoveImage,
  } = useProducts();

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminProductsHeader selectedEquipment={selectedEquipment} onAddClick={handleAddClick} isLoading={isLoading} />

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
                    <Package className="h-5 w-5 text-[#3CBFAE]" />
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
                    placeholder="Search products..."
                    className="w-full rounded-md bg-[#0c0f12] pl-10 py-2 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">Loading products...</p>
                  </div>
                ) : products?.length > 0 ? (
                  <div className="mb-2">
                    <h3 className="text-white font-medium mb-3">Products ({products.length})</h3>
                    <ProductsList products={products} onEdit={handleEditClick} onDelete={handleDeleteClick} isLoading={isLoading} />
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No products found matching "{searchQuery}"</p>
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
        <ProductForm
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          onImageChange={handleImageChange}
          previewImage={previewImage}
          onRemoveImage={handleRemoveImage}
          errors={formErrors}
          equipment={selectedEquipment}
          isEditMode={!!selectedProduct}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && selectedProduct && (
        <ConfirmationModal
          type="delete"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteProduct}
          title="Delete Product"
          message={`Are you sure you want to delete this product? This action cannot be undone.`}
          confirmText="Delete"
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default AdminProductsMain;
