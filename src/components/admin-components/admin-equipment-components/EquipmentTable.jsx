import { useState, useEffect } from "react";
import { Edit, Trash2, Cpu, Building2, Eye, EyeOff, GripVertical } from "lucide-react";

const EquipmentTable = ({ equipment, onEdit, onDelete, onToggleVisibility, industries, onReorder, industryId }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    setItems(equipment);
  }, [equipment]);

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
    // Only allow drag over items in the same industry
    if (item.industry_id !== draggedItem.item.industry_id) return;
    setDraggedOverItem({ item, index });
  };

  const handleDrop = (e, item, index) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.item.id === item.id) return;
    if (item.industry_id !== draggedItem.item.industry_id) return;
    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem.index];
    newItems.splice(draggedItem.index, 1);
    newItems.splice(index, 0, draggedItemContent);
    setItems(newItems);
    if (onReorder) {
      onReorder(newItems, item.industry_id);
    }
  };

  if (equipment.length === 0) {
    return <div className="text-center py-8 text-gray-400">No equipment found. Try adjusting your filters or add new equipment.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-[#0c0f12] text-gray-400 border-b border-[#2a2e34]">
          <tr>
            <th scope="col" className="px-6 py-3 w-8"></th>
            <th scope="col" className="px-6 py-3">
              Equipment Name
            </th>
            <th scope="col" className="px-6 py-3">
              Industry
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const industry = industries.find((ind) => ind.id === item.industry_id);
            return (
              <tr
                key={item._id}
                className={`border-b border-[#2a2e34] hover:bg-[#0c0f12] ${draggedOverItem?.item.id === item.id ? "border-[#3CBFAE] border-dashed" : ""}`}
                draggable
                onDragStart={(e) => handleDragStart(e, item, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, item, index)}
                onDrop={(e) => handleDrop(e, item, index)}
              >
                <td className="px-2 py-4 cursor-move text-center align-middle">
                  <GripVertical className="h-5 w-5 text-gray-400 mx-auto" title="Drag to reorder" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                    <span>{industry ? industry.name : ""}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleVisibility(item)}
                    className={`cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      item.visibility
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                    } transition-colors`}
                    title={item.visibility ? "Click to hide from users" : "Click to show to users"}
                  >
                    {item.visibility ? (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="cursor-pointer p-2 rounded-md hover:bg-[#22272e] transition-colors"
                      title="Edit Equipment"
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="cursor-pointer p-2 rounded-md hover:bg-[#22272e] transition-colors"
                      title="Delete Equipment"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
