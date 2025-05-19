import { useState, useEffect } from "react";
import { X, Plus, Trash2, Youtube, AlertCircle } from "lucide-react";

const QuestionForm = ({ isOpen, onClose, onSubmit, equipment, question = null, mode = "add" }) => {
  const [questionType, setQuestionType] = useState("open_ended");
  const [questionText, setQuestionText] = useState("");
  const [required, setRequired] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [options, setOptions] = useState([{ id: 1, text: "" }]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (question) {
      setQuestionType(question.type);
      setQuestionText(question.questionText);
      setRequired(question.required);
      setYoutubeUrl(question.youtubeUrl || "");

      if (question.type === "multiple_choice") {
        setOptions(question.options || [{ id: 1, text: "" }]);
        setAllowMultiple(question.allowMultiple || false);
      } else {
        setOptions([{ id: 1, text: "" }]);
        setAllowMultiple(false);
      }
    } else {
      // Reset form for new question
      setQuestionType("open_ended");
      setQuestionText("");
      setRequired(false);
      setYoutubeUrl("");
      setOptions([{ id: 1, text: "" }]);
      setAllowMultiple(false);
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
      setError("Question text is required");
      return;
    }

    if (questionType === "multiple_choice") {
      // Check if we have at least two options for multiple choice
      if (options.length < 2) {
        setError("Multiple choice questions require at least two options");
        return;
      }

      // Check if all options have text
      if (options.some((option) => !option.text.trim())) {
        setError("All options must have text");
        return;
      }
    }

    // Validate YouTube URL if provided
    if (youtubeUrl && !isValidYoutubeUrl(youtubeUrl)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    const questionData = {
      id: question?.id,
      questionText,
      type: questionType,
      required,
      ...(youtubeUrl ? { youtubeUrl } : {}),
    };

    if (questionType === "multiple_choice") {
      questionData.options = options;
      questionData.allowMultiple = allowMultiple;
    }

    onSubmit(questionData);

    // Reset form
    setError("");
  };

  const isValidYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const addOption = () => {
    const newId = Math.max(0, ...options.map((o) => o.id)) + 1;
    setOptions([...options, { id: newId, text: "" }]);
  };

  const removeOption = (id) => {
    if (options.length <= 2) {
      setError("Multiple choice questions require at least two options");
      return;
    }
    setOptions(options.filter((option) => option.id !== id));
  };

  const updateOption = (id, text) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text } : option)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-2xl my-8 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{mode === "add" ? "Add New Question" : "Edit Question"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md text-gray-300">
          <p className="text-sm">
            <span className="font-medium">Equipment:</span> {equipment.name}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-400 text-sm flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="questionType" className="block mb-2 text-sm font-medium text-gray-300">
              Question Type
            </label>
            <select
              id="questionType"
              className="w-full rounded-md bg-[#0c0f12] py-2 px-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="open_ended">Open-ended Question</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="statement">Statement (Acknowledge to Continue)</option>
              <option value="file_upload">File Upload</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="questionText" className="block mb-2 text-sm font-medium text-gray-300">
              Question Text
            </label>
            <textarea
              id="questionText"
              rows={3}
              className="w-full rounded-md bg-[#0c0f12] py-2 px-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white resize-none"
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          {questionType === "multiple_choice" && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">Options</label>
                <button type="button" onClick={addOption} className="text-xs flex items-center gap-1 text-[#3CBFAE] hover:underline">
                  <Plus className="h-3 w-3" /> Add Option
                </button>
              </div>

              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-grow rounded-md bg-[#0c0f12] py-2 px-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
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

              <div className="mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0c0f12]"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
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
              {youtubeUrl && (
                <button type="button" onClick={() => setYoutubeUrl("")} className="text-xs text-gray-400 hover:text-red-500">
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <input
                type="text"
                id="youtubeUrl"
                className="flex-grow rounded-md bg-[#0c0f12] py-2 px-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">Add a YouTube video that will be shown with this question</p>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#3CBFAE] border-[#2a2e34] rounded focus:ring-[#3CBFAE] bg-[#0c0f12]"
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
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
              {mode === "add" ? "Add Question" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
