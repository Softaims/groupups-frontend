import { X } from "lucide-react";

const EquipmentModal = ({ isOpen, onClose, onSubmit, formData, onFormChange, errors, isEditMode, industries }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{isEditMode ? "Edit Equipment" : "Add New Equipment"}</h2>
            <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
              <select
                name="industry_id"
                value={formData.industry_id}
                onChange={onFormChange}
                className={`w-full rounded-md bg-[#0f1216] border ${
                  errors.industry_id ? "border-red-500" : "border-[#2a2e34]"
                } px-3 py-2 text-white focus:outline-none focus:border-[#3CBFAE] cursor-pointer`}
              >
                <option value="">Select an industry</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </select>
              {errors.industry_id && <p className="mt-1 text-sm text-red-500">{errors.industry_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Equipment Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onFormChange}
                className={`w-full rounded-md bg-[#0f1216] border ${
                  errors.name ? "border-red-500" : "border-[#2a2e34]"
                } px-3 py-2 text-white focus:outline-none focus:border-[#3CBFAE] cursor-text`}
                placeholder="Enter equipment name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="visibility"
                name="visibility"
                checked={formData.visibility}
                onChange={(e) => onFormChange({ target: { name: "visibility", value: e.target.checked } })}
                className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0f1216]"
              />
              <label htmlFor="visibility" className="text-sm text-gray-300">
                Make this equipment visible to users
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-300 hover:text-white cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#3CBFAE] hover:bg-[#35a99a] text-white rounded-md cursor-pointer">
                {isEditMode ? "Save Changes" : "Add Equipment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;
