import React from "react";
import { X } from "lucide-react";
const GoodFitReason = ({ goodFitReason }) => {
  return (
    <div className="bg-[#D9D9D9]/5 rounded-2xl p-4 md:p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-base md:text-lg text-white">Why good fit</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <X className="w-8 h-8 bg-[#1D403F]/40 rounded-full p-2" />
        </button>
      </div>
      <p className="text-[#A0A0A0] text-xs md:text-sm leading-relaxed">{goodFitReason}</p>
      <div className="mt-4 flex justify-end">
        <button className="bg-[#4AA6A4] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:bg-[#3d8d8b] transition-colors">
          View Demo
        </button>
      </div>
    </div>
  );
};

export default GoodFitReason;
