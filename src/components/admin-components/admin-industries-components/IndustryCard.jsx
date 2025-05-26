import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

const IndustryCard = ({ industry, handleEdit, handleDelete, onToggleVisibility }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] overflow-hidden group">
      <div className="relative h-48">
        {!imageLoaded && <div className="absolute inset-0 bg-[#2a2e34] animate-pulse" />}

        <img
          src={industry.industry_image}
          alt={industry.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => handleEdit(industry)}
            className="cursor-pointer p-2 bg-[#3CBFAE] rounded-md hover:bg-[#35a99a] transition-colors"
            title="Edit industry"
          >
            <Pencil size={18} className="text-white" />
          </button>
          <button
            onClick={() => handleDelete(industry)}
            className="cursor-pointer p-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            title="Delete industry"
          >
            <Trash2 size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
          <button
            onClick={() => onToggleVisibility(industry)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              industry.visibility
                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
            } transition-colors`}
            title={industry.visibility ? "Click to hide from users" : "Click to show to users"}
          >
            {industry.visibility ? (
              <>
                <Eye size={16} />
                <span>Visible</span>
              </>
            ) : (
              <>
                <EyeOff size={16} />
                <span>Hidden</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;
