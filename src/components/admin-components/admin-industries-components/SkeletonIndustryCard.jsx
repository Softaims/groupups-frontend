const SkeletonIndustryCard = () => {
  return (
    <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] overflow-hidden">
      <div className="relative h-48 bg-gray-700/40 animate-pulse" />
      <div className="p-4">
        <div className="h-5 w-2/3 bg-gray-700/50 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonIndustryCard;
