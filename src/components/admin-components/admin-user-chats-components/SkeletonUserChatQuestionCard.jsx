const SkeletonUserChatQuestionCard = () => {
  return (
    <div className="p-4 bg-[#0c0f12] rounded-lg border border-[#2a2e34] animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-700 rounded" />
          <div className="h-4 w-40 bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-700 rounded ml-2" />
          <div className="h-5 w-14 bg-gray-700 rounded ml-2" />
        </div>
        <div className="h-5 w-5 bg-gray-700 rounded" />
      </div>

      <div className="mt-4 pt-4 border-t border-[#2a2e34]">
        <div className="flex items-start gap-2 mb-2">
          <div className="h-4 w-12 bg-gray-700 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-3/4 bg-gray-700 rounded" />
            <div className="h-3 w-1/2 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserChatQuestionCard;
