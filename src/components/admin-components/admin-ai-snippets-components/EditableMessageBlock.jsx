import { useState } from "react";
import { Edit2, X } from "lucide-react";

const EditableMessageBlock = ({ label, value, placeholder, onSave }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(value || "");

  const handleEdit = () => {
    setEditValue(value || "");
    setEditModalOpen(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setEditModalOpen(false);
  };

  return (
    <div className="mb-3">
      <h3 className="text-white font-medium mb-1">{label}</h3>
      <div className="flex items-center gap-2 bg-[#0c0f12] border border-[#2a2e34] rounded-md px-3 py-6">
        <span className="flex-1 text-white whitespace-pre-wrap">
          {value || (
            <span className="text-gray-400">No {label.toLowerCase()} set</span>
          )}
        </span>
        <button
          className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
          title={`Edit ${label}`}
          onClick={handleEdit}
        >
          <Edit2 className="h-4 w-4 text-[#3CBFAE]" />
        </button>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2e34]">
              <h2 className="text-xl font-semibold text-white">Edit {label}</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white cursor-pointer hover:bg-[#0c0f12] rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="p-4 space-y-4"
            >
              <div>
                <label
                  htmlFor="edit-message-block-textarea"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  {label}
                </label>
                <textarea
                  id="edit-message-block-textarea"
                  rows={6}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full rounded-md bg-[#0c0f12] p-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white resize-none"
                  placeholder={placeholder}
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2e34]">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-[#3CBFAE] text-white rounded-md hover:bg-[#35ab9c] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableMessageBlock;