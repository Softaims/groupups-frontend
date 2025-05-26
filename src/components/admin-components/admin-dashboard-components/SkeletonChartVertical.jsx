const SkeletonChartVertical = () => {
  return (
    <div className="h-[250px] md:h-[325px] w-full rounded-md bg-[#1a1e24] border border-[#2a2e34] p-4 animate-pulse">
      <div className="flex items-end justify-between h-full">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-20 rounded-sm bg-[#2a2e34]"
            style={{
              height: `${Math.floor(Math.random() * 70) + 30}%`, // random height between 30% to 100%
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonChartVertical;
