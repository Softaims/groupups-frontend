const SkeletonEquipmentTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-[#0c0f12] text-gray-400 border-b border-[#2a2e34]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Equipment Name
            </th>
            <th scope="col" className="px-6 py-3">
              Industry
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, idx) => (
            <tr key={idx} className="border-b border-[#2a2e34] hover:bg-[#0c0f12] animate-pulse">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-700/50" />
                  <div className="h-4 w-32 bg-gray-700/50 rounded-md" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-700/50" />
                  <div className="h-4 w-28 bg-gray-700/50 rounded-md" />
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 bg-gray-700/50 rounded-md" />
                  <div className="h-8 w-8 bg-gray-700/50 rounded-md" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonEquipmentTable;
