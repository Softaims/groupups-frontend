import { Trash2, Upload, X } from "lucide-react";

const ProductForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  onImageChange,
  previewImage,
  onRemoveImage,
  errors,
  equipment,
  isEditMode,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="p-6 border-b border-[#2a2e34] flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-[#0c0f12] border-b border-[#2a2e34]">
          <p className="text-sm text-gray-300">
            <span className="font-medium">Equipment:</span> {equipment.name}
          </p>
        </div>

        {/* Scrollable Form Content */}
        <form id="product-form" onSubmit={onSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div>
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

            <div>
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  errors?.image ? "border-red-500" : "border-[#2a2e34]"
                } border-dashed rounded-md cursor-pointer`}
              >
                <div className="space-y-1 text-center">
                  {previewImage ? (
                    <div className="relative">
                      <img src={previewImage} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={onRemoveImage}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md font-medium text-[#3CBFAE] hover:text-[#35a99a] focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input id="image-upload" name="image" type="file" accept="image/*" className="sr-only" onChange={onImageChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
              {errors?.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            <div>
              <label htmlFor="why_good_fit_reason" className="block mb-2 text-sm font-medium text-gray-300">
                Why Good Fit Reason
              </label>
              <textarea
                id="why_good_fit_reason"
                rows={3}
                className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                  errors?.why_good_fit_reason ? "border-red-500" : "border-[#2a2e34]"
                } focus:outline-none focus:border-[#3CBFAE] text-white resize-none`}
                placeholder="Explain why this product is a good fit"
                value={formData.why_good_fit_reason}
                onChange={(e) => onFormChange("why_good_fit_reason", e.target.value)}
              />
              {errors?.why_good_fit_reason && <p className="mt-1 text-sm text-red-500">{errors.why_good_fit_reason}</p>}
            </div>

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
          </div>
        </form>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-[#2a2e34] bg-[#1a1e24] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#0c0f12] border border-[#2a2e34] text-white hover:bg-[#2a2e34] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            className="px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
