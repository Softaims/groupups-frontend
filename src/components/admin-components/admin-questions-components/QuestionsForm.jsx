import { useState, useEffect } from "react";
import { X } from "lucide-react";

const QuestionForm = ({ isOpen, onClose, onSubmit, equipment, question = null, mode = "add" }) => {
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
      setError("Question text is required");
      return;
    }

    onSubmit({
      id: question?.id,
      question: questionText,
    });

    // Reset form
    setQuestionText("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-md">
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

        {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="questionText" className="block mb-2 text-sm font-medium text-gray-300">
              Question
            </label>
            <textarea
              id="questionText"
              rows={3}
              className="w-full rounded-md bg-[#0c0f12] py-2 px-3 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white resize-none"
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-400">This question will be shown to clients for this equipment.</p>
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
