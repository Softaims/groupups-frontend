const SkeletonMessage = () => {
  return (
    <div className="flex justify-start mb-2">
      <div
        className="
          rounded-2xl py-3 px-5 
          max-w-[70%] 
          bg-[#D9D9D9]/5 text-white
        "
      >
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-600/30 rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-600/30 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-600/30 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMessage;
