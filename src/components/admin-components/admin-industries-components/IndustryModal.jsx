import { Trash2, Upload, X } from "lucide-react";
const IndustryModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  onImageChange,
  previewImage,
  onRemoveImage,
  isEditMode,
  errors,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{isEditMode ? "Edit Industry" : "Add New Industry"}</h2>
            <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onFormChange}
                className={`w-full rounded-md bg-[#0f1216] border ${
                  errors.name ? "border-red-500" : "border-[#2a2e34]"
                } px-3 py-2 text-white focus:outline-none focus:border-[#3CBFAE] cursor-text`}
                placeholder="Enter industry name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="visibility"
                name="visibility"
                checked={formData.visibility}
                onChange={onFormChange}
                className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0f1216]"
              />
              <label htmlFor="visibility" className="text-sm text-gray-300">
                Make this industry visible to users
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry Image</label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  errors.image ? "border-red-500" : "border-[#2a2e34]"
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
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-300 hover:text-white cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#3CBFAE] hover:bg-[#35a99a] text-white rounded-md cursor-pointer">
                {isEditMode ? "Save Changes" : "Add Industry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndustryModal;
