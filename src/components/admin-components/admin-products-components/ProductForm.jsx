import { X } from "lucide-react";

const ProductForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  errors,
  equipment,
  isEditMode,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-2xl my-8 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md text-gray-300">
          <p className="text-sm">
            <span className="font-medium">Equipment:</span> {equipment.name}
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.name ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white`}
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
            />
            {errors?.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.description ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white resize-none`}
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => onFormChange("description", e.target.value)}
            />
            {errors?.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">
                Price
              </label>
              <input
                type="number"
                id="price"
                min="0"
                step="0.01"
                className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                  errors?.price ? "border-red-500" : "border-[#2a2e34]"
                } focus:outline-none focus:border-[#3CBFAE] text-white`}
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => onFormChange("price", e.target.value)}
              />
              {errors?.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-300">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                min="0"
                className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                  errors?.stock ? "border-red-500" : "border-[#2a2e34]"
                } focus:outline-none focus:border-[#3CBFAE] text-white`}
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => onFormChange("stock", e.target.value)}
              />
              {errors?.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0c0f12]"
                checked={formData.is_featured}
                onChange={(e) => onFormChange("is_featured", e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-300">Mark as featured product</span>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#0c0f12] border border-[#2a2e34] text-white hover:bg-[#2a2e34] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 