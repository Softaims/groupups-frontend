import { Edit, Trash2, Cpu, Building2, Eye, EyeOff } from "lucide-react";

const EquipmentTable = ({ equipment, onEdit, onDelete, onToggleVisibility, industries }) => {
  if (equipment.length === 0) {
    return <div className="text-center py-8 text-gray-400">No equipment found. Try adjusting your filters or add new equipment.</div>;
  }
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
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => {
            const industry = industries.find((ind) => ind.id === item.industry_id);
            return (
              <tr key={item._id} className="border-b border-[#2a2e34] hover:bg-[#0c0f12]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                    <span>{industry ? industry.name : ""}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleVisibility(item)}
                    className={`cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      item.visibility
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                    } transition-colors`}
                    title={item.visibility ? "Click to hide from users" : "Click to show to users"}
                  >
                    {item.visibility ? (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="cursor-pointer p-2 rounded-md hover:bg-[#22272e] transition-colors"
                      title="Edit Equipment"
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="cursor-pointer p-2 rounded-md hover:bg-[#22272e] transition-colors"
                      title="Delete Equipment"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
