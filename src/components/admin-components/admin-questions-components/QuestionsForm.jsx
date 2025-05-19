import { X, Plus, Trash2, Youtube } from "lucide-react";
import { adminQuestionSchema } from "../../../validations/adminQuestionSchema";

const QuestionForm = ({ isOpen, onClose, onSubmit, formData, onFormChange, errors, equipment, isEditMode }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validationData = {
        ...formData,
        options: formData.type === "multiple_choice" ? formData.options.filter(opt => opt.text.trim() !== "") : undefined,
        allowMultiple: formData.type === "multiple_choice" ? formData.allowMultiple : undefined,
      };

      const validatedData = adminQuestionSchema.parse(validationData);
      onSubmit(isEditMode ? { ...validatedData, id: formData.id } : validatedData);
    } catch (error) {
      if (error.errors) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        onFormChange("errors", formattedErrors);
      }
    }
  };

  const handleTypeChange = (type) => {
    onFormChange("type", type);
    onFormChange("options", type === "multiple_choice" 
      ? (formData.options.length >= 2 ? formData.options : [{ id: 1, text: "" }, { id: 2, text: "" }])
      : [{ id: 1, text: "" }]
    );
    onFormChange("allowMultiple", type === "multiple_choice" ? formData.allowMultiple : false);
  };

  const addOption = () => {
    const newId = Math.max(0, ...formData.options.map(o => o.id)) + 1;
    onFormChange("options", [...formData.options, { id: newId, text: "" }]);
  };

  const removeOption = (id) => {
    if (formData.options.length <= 2) {
      onFormChange("errors", { options: "Multiple choice questions require at least two options" });
      return;
    }
    onFormChange("options", formData.options.filter(option => option.id !== id));
  };

  const updateOption = (id, text) => {
    onFormChange("options", formData.options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-2xl my-8 mx-4">
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="questionType" className="block mb-2 text-sm font-medium text-gray-300">
              Question Type
            </label>
            <select
              id="questionType"
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.type ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white`}
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="open_ended">Open-ended Question</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="statement">Statement (Acknowledge to Continue)</option>
              <option value="file_upload">File Upload</option>
            </select>
            {errors?.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="questionText" className="block mb-2 text-sm font-medium text-gray-300">
              Question Text
            </label>
            <textarea
              id="questionText"
              rows={3}
              className={`w-full rounded-md bg-[#0c0f12] py-2 px-3 border ${
                errors?.questionText ? "border-red-500" : "border-[#2a2e34]"
              } focus:outline-none focus:border-[#3CBFAE] text-white resize-none`}
              placeholder="Enter question text"
              value={formData.questionText}
              onChange={(e) => onFormChange("questionText", e.target.value)}
            />
            {errors?.questionText && <p className="mt-1 text-sm text-red-500">{errors.questionText}</p>}
          </div>

          {formData.type === "multiple_choice" && (
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
                    checked={formData.allowMultiple}
                    onChange={(e) => onFormChange("allowMultiple", e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-300">Allow multiple selections</span>
                </label>
              </div>
            </div>
          )}

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="youtubeUrl" className="text-sm font-medium text-gray-300">
                YouTube Video URL (Optional)
              </label>
              {formData.youtubeUrl && (
                <button
                  type="button"
                  onClick={() => onFormChange("youtubeUrl", "")}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <input
                type="text"
                id="youtubeUrl"
                className={`flex-grow rounded-md bg-[#0c0f12] py-2 px-3 border ${
                  errors?.youtubeUrl ? "border-red-500" : "border-[#2a2e34]"
                } focus:outline-none focus:border-[#3CBFAE] text-white`}
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={(e) => onFormChange("youtubeUrl", e.target.value)}
              />
            </div>
            {errors?.youtubeUrl && <p className="mt-1 text-sm text-red-500">{errors.youtubeUrl}</p>}
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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#0c0f12] border border-[#2a2e34] text-white hover:bg-[#2a2e34] transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors">
              {isEditMode ? "Save Changes" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;

