import { Pencil, Trash2 } from "lucide-react";

const IndustryCard = ({ industry, handleEdit, handleDelete }) => {
  return (
    <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] overflow-hidden group">
      <div className="relative h-48">
        <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60  opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => handleEdit(industry)}
            className="cursor-pointer p-2 bg-[#3CBFAE] rounded-md hover:bg-[#35a99a] transition-colors"
          >
            <Pencil size={18} className=" text-white" />
          </button>
          <button
            onClick={() => handleDelete(industry)}
            className="cursor-pointer p-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} className=" text-white" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
      </div>
    </div>
  );
};

export default IndustryCard;
