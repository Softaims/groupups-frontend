import { useState, useEffect } from "react";
import IndustryCard from "./IndustryCard";

const IndustriesList = ({ industries, onEdit, onDelete, onToggleVisibility, onReorder }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    setItems(industries);
  }, [industries]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((industry, index) => (
        <div
          key={industry.id}
          className={`relative ${draggedOverItem?.item.id === industry.id ? "border-[#3CBFAE] border-dashed" : ""}`}
          draggable
          onDragStart={(e) => handleDragStart(e, industry, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, industry, index)}
          onDrop={(e) => handleDrop(e, industry, index)}
        >
          <IndustryCard
            industry={industry}
            handleEdit={onEdit}
            handleDelete={onDelete}
            onToggleVisibility={onToggleVisibility}
          />
        </div>
      ))}
    </div>
  );
};

export default IndustriesList; 