const SkeletonWelcomeSection = () => {
  return (
    <main className="flex flex-1">
      <div className="lg:w-[40%] w-full flex flex-col justify-between px-12 py-10 animate-pulse">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <div className="h-8 md:h-10 bg-gray-700 rounded w-[90%] mb-4"></div>
            <div className="h-8 md:h-10 bg-gray-700 rounded w-[80%] mb-2"></div>
            <div className="h-6 bg-[#4aa6a4]/30 rounded w-[75%] mb-8"></div>
            <div className="h-12 bg-white/20 rounded-full w-[180px]"></div>
          </div>
        </div>
        <div className="h-4 bg-white/10 rounded w-[180px] mx-auto mt-10"></div>
      </div>
    </main>
  );
};

export default SkeletonWelcomeSection;
