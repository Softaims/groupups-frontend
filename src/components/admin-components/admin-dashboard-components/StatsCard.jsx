const StatsCard = ({ stat }) => {
  return (
    <div className="bg-[#1a1e24] rounded-lg p-4 border border-[#2a2e34]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-300">{stat.title}</p>
        <stat.icon className="h-4 w-4 text-[#3CBFAE]" />
      </div>

      {!stat.value ? (
        <div className="h-7 w-20 bg-gray-700 rounded-md animate-pulse mb-1" />
      ) : (
        <div className="text-2xl font-bold text-white">{stat.value}</div>
      )}

      {!stat.change ? (
        <div className="h-4 w-24 bg-gray-700 rounded-sm animate-pulse" />
      ) : (
        <p className="text-xs text-gray-400">{stat.change}</p>
      )}
    </div>
  );
};

export default StatsCard;
