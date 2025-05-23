import React from "react";

const SkeletonUserChatDetailHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-pulse">
      <div>
        <div className="h-6 w-48 bg-gray-700 rounded mb-2" />
        <div className="space-y-2 text-gray-400">
          <div className="h-4 w-40 bg-gray-700 rounded" />
          <div className="h-4 w-32 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserChatDetailHeader;
