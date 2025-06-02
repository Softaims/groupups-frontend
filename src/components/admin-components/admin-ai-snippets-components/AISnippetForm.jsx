import { X } from "lucide-react";

const AISnippetForm = ({ isOpen, onClose, onSubmit, formData, onFormChange, errors, isEditMode, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#2a2e34]">
          <h2 className="text-xl font-semibold text-white">{isEditMode ? "Edit AI Snippet" : "Add AI Snippet"}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-[#0c0f12] rounded-md transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="snippet_text" className="block text-sm font-medium text-gray-400 mb-1">
              AI Snippet Text
            </label>
            <textarea
              id="snippet_text"
              name="snippet_text"
              rows={6}
              value={formData.snippet_text}
              onChange={(e) => onFormChange("snippet_text", e.target.value)}
              className={`w-full rounded-md bg-[#0c0f12] p-3 border ${
                errors.snippet_text ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white resize-none`}
              placeholder="Enter AI training snippet text..."
            />
            {errors.snippet_text && <p className="mt-1 text-sm text-red-500">{errors.snippet_text}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2e34]">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#3CBFAE] text-white rounded-md hover:bg-[#35ab9c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : isEditMode ? "Update Snippet" : "Add Snippet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AISnippetForm;
