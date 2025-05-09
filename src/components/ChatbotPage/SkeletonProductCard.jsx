const SkeletonProductCard = () => {
  return (
    <div className="relative overflow-hidden bg-[#D9D9D9]/5 rounded-lg p-4 md:p-5 flex flex-col md:flex-row leading-relaxed">
      <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-6">
        <div className="bg-[#041018] rounded-xl p-2 relative border border-[#FFFFFF]/10 w-40 h-40 md:w-50 md:h-50 animate-pulse">
          <div className="absolute top-[-4px] left-[-4px] bg-[#1a2a2f] rounded-full w-5 h-5 md:w-6 md:h-6 animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 w-48 bg-gray-700/50 rounded-md animate-pulse"></div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-gray-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-700/50 rounded-md animate-pulse"></div>
          </div>

          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-gray-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-700/50 rounded-md animate-pulse"></div>
          </div>

          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-gray-700/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-700/50 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <div className="h-8 w-24 bg-white/30 rounded-xl animate-pulse"></div>
          <div className="h-8 w-24 bg-[#4AA6A4]/50 rounded-xl animate-pulse"></div>
        </div>
      </div>

      <div className="bg-[#D9D9D9]/2 absolute top-0 right-0 p-4 flex flex-col space-y-4">
        <div className="w-5 h-5 bg-gray-700/50 rounded-md animate-pulse"></div>
        <div className="w-5 h-5 bg-gray-700/50 rounded-md animate-pulse"></div>
        <div className="w-5 h-5 bg-gray-700/50 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
