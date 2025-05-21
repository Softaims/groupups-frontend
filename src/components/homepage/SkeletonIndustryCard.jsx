import React from "react";

const SkeletonIndustryCard = () => {
  return (
    <div className="border border-[#187775]/30 rounded-lg p-4 pt-14 flex flex-col items-center justify-end gap-6">
      <div className="w-13 h-13 bg-[#187775]/10 rounded-lg animate-pulse" />
      <div className="h-5 w-24 bg-[#187775]/10 rounded animate-pulse" />
    </div>
  );
};

export default SkeletonIndustryCard;
