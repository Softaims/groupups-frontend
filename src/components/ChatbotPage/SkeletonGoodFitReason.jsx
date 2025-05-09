const SkeletonGoodFitReason = () => {
  return (
    <div className="bg-[#D9D9D9]/5 rounded-2xl p-4 md:p-5">
      <div className="flex justify-between items-center mb-3">
        <div className="h-6 w-32 bg-gray-700/50 rounded-md animate-pulse"></div>
        <div className="w-8 h-8 bg-[#1D403F]/40 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700/50 rounded-md animate-pulse w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded-md animate-pulse w-11/12"></div>
        <div className="h-4 bg-gray-700/50 rounded-md animate-pulse w-3/4"></div>
      </div>
      <div className="mt-4 flex justify-end">
        <div className="h-8 w-24 bg-[#4AA6A4]/50 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonGoodFitReason;
