import { useState, useEffect } from "react";
import { Edit2, Trash2, GripVertical } from "lucide-react";

const AISnippetsList = ({ snippets, onEdit, onDelete, onReorder, isLoading }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    setItems(snippets);
  }, [snippets]);

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

  return (
    <div className="space-y-3">
      {items.map((snippet, index) => (
        <div
          key={snippet.id}
          className={`
            bg-[#0c0f12] border border-[#2a2e34] rounded-md overflow-hidden
            ${draggedOverItem?.item.id === snippet.id ? "border-[#3CBFAE] border-dashed" : ""}
          `}
          draggable
          onDragStart={(e) => handleDragStart(e, snippet, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, snippet, index)}
          onDrop={(e) => handleDrop(e, snippet, index)}
        >
          <div className="flex items-stretch">
            <div className="w-1.5 bg-[#3CBFAE]"></div>
            <div className="flex-grow p-3 flex items-center gap-3">
              <div className="cursor-move flex items-center justify-center p-1 hover:bg-[#1a1e24] rounded mt-1" title="Drag to reorder">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1e24] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <p className="text-white whitespace-pre-wrap">{snippet.snippet_text}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(snippet)}
                  disabled={isLoading}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Edit Snippet"
                >
                  <Edit2 className="h-4 w-4 text-[#3CBFAE]" />
                </button>
                <button
                  onClick={() => onDelete(snippet)}
                  disabled={isLoading}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Delete Snippet"
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

export default AISnippetsList;
