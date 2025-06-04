import React from "react";
import { X, Plus, Trash2, Youtube } from "lucide-react";

const QuestionForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  handleTypeChange,
  addOption,
  removeOption,
  updateOption,
  errors,
  equipment,
  isEditMode,
  isLoading,
  addContextItem,
  removeContextItem,
  updateContextItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-2xl my-8 mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{isEditMode ? "Edit Question" : "Add New Question"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md text-gray-300">
          <p className="text-sm">
            <span className="font-medium">Equipment:</span> {equipment.name}
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pr-2">
          <div className="mb-4">
            <label htmlFor="question_type" className="block mb-2 text-sm font-medium text-gray-300">
              Question Type
            </label>
            <select
              disabled={true}
              id="question_type"
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.question_type ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white`}
              value={formData.question_type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="open_ended">Open-ended Question</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="statement">Statement (Acknowledge to Continue)</option>
              <option value="file_upload">File Upload</option>
            </select>
            {errors?.question_type && <p className="mt-1 text-sm text-red-500">{errors.question_type}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="question_text" className="block mb-2 text-sm font-medium text-gray-300">
              Question Text
            </label>
            <textarea
              id="question_text"
              rows={3}
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.question_text ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white resize-none`}
              placeholder="Enter question text"
              value={formData.question_text}
              onChange={(e) => onFormChange("question_text", e.target.value)}
            />
            {errors?.question_text && <p className="mt-1 text-sm text-red-500">{errors.question_text}</p>}
          </div>

          {formData.question_type === "multiple_choice" && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">Options</label>
                <button type="button" onClick={addOption} className="text-xs flex items-center gap-1 text-[#3CBFAE] hover:underline">
                  <Plus className="h-3 w-3" /> Add Option
                </button>
              </div>

              <div className="space-y-2">
                {formData.options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      className={`flex-grow rounded-md bg-[#0c0f12] py-2 px-3 border ${
                        errors?.options ? "border-red-500" : "border-[#2a2e34]"
                      } focus:outline-none focus:border-[#3CBFAE] text-white`}
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="p-2 rounded-md hover:bg-[#0c0f12] text-gray-400 hover:text-red-500"
                      title="Remove option"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {errors?.options && <p className="mt-1 text-sm text-red-500">{errors.options}</p>}

              <div className="mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0c0f12]"
                    checked={formData.allowMultipleSelection}
                    onChange={(e) => onFormChange("allowMultipleSelection", e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-300">Allow multiple selections</span>
                </label>
              </div>
            </div>
          )}

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="youtube_link" className="text-sm font-medium text-gray-300">
                YouTube Video URL (Optional)
              </label>
              {formData.youtube_link && (
                <button type="button" onClick={() => onFormChange("youtube_link", "")} className="text-xs text-gray-400 hover:text-red-500">
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <input
                type="text"
                id="youtube_link"
                className={`flex-grow rounded-md bg-[#0c0f12] py-2 px-3 border ${
                  errors?.youtube_link ? "border-red-500" : "border-[#2a2e34]"
                } focus:outline-none focus:border-[#3CBFAE] text-white`}
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtube_link}
                onChange={(e) => onFormChange("youtube_link", e.target.value)}
              />
            </div>
            {errors?.youtube_link && <p className="mt-1 text-sm text-red-500">{errors.youtube_link}</p>}
            <p className="mt-1 text-xs text-gray-400">Add a YouTube video that will be shown with this question</p>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0c0f12]"
                checked={formData.required}
                onChange={(e) => onFormChange("required", e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-300">Mark as required</span>
            </label>
          </div>

          {/* Context Items */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">
                Context Items
              </label>
              <button
                type="button"
                onClick={addContextItem}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#3CBFAE] hover:bg-[#35a89a] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3CBFAE] transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Context
              </button>
            </div>
            <div className="space-y-3">
              {formData.context.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={item}
                    onChange={(e) => updateContextItem(index, e.target.value)}
                    placeholder="Enter context item"
                    rows={2}
                    className="flex-1 min-w-0 block w-full px-3 py-2 text-sm bg-[#0c0f12] border border-[#2a2e34] rounded-md focus:outline-none focus:border-[#3CBFAE] text-white resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeContextItem(index)}
                    className="inline-flex items-center p-2 text-sm font-medium text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors?.context && (
              <p className="mt-1 text-sm text-red-500">{errors.context}</p>
            )}
            <p className="text-sm text-gray-400">
              Add context items that will help the AI understand the question better.
            </p>
          </div>

          <div className="sticky bottom-0 bg-[#1a1e24] pt-4 border-t border-[#2a2e34]">
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
                {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Add Question"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
