"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, GripVertical } from "lucide-react";

const QuestionsList = ({ questions, onEdit, onDelete, onReorder }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    setItems(questions);
  }, [questions]);

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    // This is needed for Firefox
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
    // Add a slight delay to make the dragged item invisible
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

    // Remove the dragged item
    newItems.splice(draggedItem.index, 1);

    // Add it at the new position
    newItems.splice(index, 0, draggedItemContent);

    setItems(newItems);
    onReorder(newItems);
  };

  const getPriorityColor = (priority) => {
    if (priority === 1) return "bg-red-500";
    if (priority === 2) return "bg-orange-500";
    if (priority === 3) return "bg-yellow-500";
    return "bg-blue-500";
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
            <div className={`w-1.5 ${getPriorityColor(question.priority)}`}></div>
            <div className="flex-grow p-3 flex items-center gap-3">
              <div className="cursor-move flex items-center justify-center p-1 hover:bg-[#1a1e24] rounded" title="Drag to reorder">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1e24] text-xs font-medium text-white">
                    {question.priority}
                  </span>
                  <h4 className="font-medium text-white">{question.question}</h4>
                </div>
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
