const SkeletonChartHorizontal = () => {
  return (
    <div className="h-[250px] md:h-[325px] w-full rounded-md bg-[#1a1e24] border border-[#2a2e34] p-4 animate-pulse">
      <div className="flex flex-col justify-between h-full space-y-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-6 rounded-sm bg-[#2a2e34]"
            style={{
              width: `${Math.floor(Math.random() * 50) + 40}%`, // width between 40% and 90%
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonChartHorizontal;
