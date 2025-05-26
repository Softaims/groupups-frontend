import React from "react";

const SkeletonUserChatCard = () => {
  return (
    <div className="flex items-center justify-between px-4 py-6 bg-[#0c0f12] rounded-lg border border-[#2a2e34] hover:bg-[#22272e] transition-colors animate-pulse">
      <div className="flex-1 space-y-1">
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-800 rounded w-1/4 mt-1"></div>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonUserChatCard;
