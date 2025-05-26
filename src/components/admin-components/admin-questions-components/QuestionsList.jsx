import { useState, useEffect } from "react";
import { Edit, Trash2, GripVertical, FileText, CheckSquare, Upload, Youtube } from "lucide-react";

const QuestionsList = ({ questions, onEdit, onDelete, onReorder }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    setItems(questions);
  }, [questions]);

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
    setTimeout(() => {
      e.target.classList.add("opacity-50");
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-50");
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragOver = (e, item, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!draggedItem || draggedItem.item.id === item.id) return;
    setDraggedOverItem({ item, index });
  };

  const handleDrop = (e, item, index) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.item.id === item.id) return;
    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem.index];
    newItems.splice(draggedItem.index, 1);
    newItems.splice(index, 0, draggedItemContent);

    setItems(newItems);
    onReorder(newItems);
  };

  const getPriorityColor = (priority) => {
    if (priority === 1) return "bg-red-500";
    if (priority === 2) return "bg-orange-500";
    if (priority === 3) return "bg-yellow-500";
    if (priority === 4) return "bg-green-500";
    return "bg-blue-500";
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "open_ended":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "multiple_choice":
        return <CheckSquare className="h-4 w-4 text-green-400" />;
      case "statement":
        return <FileText className="h-4 w-4 text-yellow-400" />;
      case "file_upload":
        return <Upload className="h-4 w-4 text-purple-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "open_ended":
        return "Open-ended";
      case "multiple_choice":
        return "Multiple Choice";
      case "statement":
        return "Statement";
      case "file_upload":
        return "File Upload";
      default:
        return "Unknown";
    }
  };

  const renderQuestionDetails = (question) => {
    switch (question.question_type) {
      case "multiple_choice":
        return (
          <div className="mt-2 text-xs text-gray-400">
            <span className="mr-2">{question.allowMultipleSelection ? "Multiple selections allowed" : "Single selection only"}</span>
            <span className="mr-2">•</span>
            <span>{question.options.length} options</span>
          </div>
        );
      case "file_upload":
        return (
          <div className="mt-2 text-xs text-gray-400">
            <span>File upload required</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {items.map((question, index) => (
        <div
          key={question.id}
          className={`
            bg-[#0c0f12] border border-[#2a2e34] rounded-md overflow-hidden
            ${draggedOverItem?.item.id === question.id ? "border-[#3CBFAE] border-dashed" : ""}
          `}
          draggable
          onDragStart={(e) => handleDragStart(e, question, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, question, index)}
          onDrop={(e) => handleDrop(e, question, index)}
        >
          <div className="flex items-stretch">
            <div className={`w-1.5 ${getPriorityColor(index + 1)}`}></div>
            <div className="flex-grow p-3 flex items-start gap-3">
              <div className="cursor-move flex items-center justify-center p-1 hover:bg-[#1a1e24] rounded mt-1" title="Drag to reorder">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1e24] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-white">{question.question_text}</h4>
                  {question.required && <span className="bg-red-900/30 text-red-400 text-xs px-2 py-0.5 rounded">Required</span>}
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
                    {getQuestionTypeIcon(question.question_type)}
                    <span className="text-gray-300">{getQuestionTypeLabel(question.question_type)}</span>
                  </div>

                  {question.youtube_link && (
                    <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span className="text-gray-300">YouTube Video</span>
                    </div>
                  )}
                </div>

                {renderQuestionDetails(question)}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(question)}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Edit Question"
                >
                  <Edit className="h-4 w-4 text-[#3CBFAE]" />
                </button>
                <button
                  onClick={() => onDelete(question)}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Delete Question"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
