"use client";

import { Edit, Trash2, Cpu, Building2 } from "lucide-react";

const EquipmentTable = ({ equipment, onEdit, onDelete }) => {
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
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id} className="border-b border-[#2a2e34] hover:bg-[#0c0f12]">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#3CBFAE] flex-shrink-0" />
                  <span>{item.industryName}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 rounded-md bg-[#0c0f12] border border-[#2a2e34] hover:bg-[#2a2e34] transition-colors"
                  >
                    <Edit className="h-4 w-4 text-[#3CBFAE]" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1.5 rounded-md bg-[#0c0f12] border border-[#2a2e34] hover:bg-[#2a2e34] transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
