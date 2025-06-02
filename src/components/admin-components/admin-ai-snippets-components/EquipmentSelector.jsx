import { useState } from "react";
import { Cpu, ChevronDown, X } from "lucide-react";

const EquipmentSelector = ({
  industries,
  equipment,
  selectedIndustry,
  selectedEquipment,
  onIndustrySelect,
  onEquipmentSelect,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEquipmentSelect = (equipment) => {
    onEquipmentSelect(equipment);
    setIsOpen(false);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onEquipmentSelect(null);
    onIndustrySelect(null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="w-full flex items-center justify-between p-3 bg-[#1a1e24] border border-[#2a2e34] rounded-lg text-white hover:bg-[#22272e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-[#3CBFAE]" />
          <span>
            {selectedEquipment
              ? `${selectedEquipment.name}${selectedIndustry ? ` (${selectedIndustry.name})` : ""}`
              : "Select Equipment to Manage AI Snippets"}
          </span>
          {(selectedEquipment || selectedIndustry) && (
            <button onClick={clearSelection} className="ml-2 p-1 rounded-full hover:bg-[#2a2e34] transition-colors" title="Clear selection">
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#1a1e24] border border-[#2a2e34] rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            {/* Industries sidebar */}
            <div className="w-1/3 border-r border-[#2a2e34] bg-[#0c0f12]">
              <ul className="py-2">
                {industries.map((industry) => (
                  <li key={industry.id}>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-[#2a2e34] transition-colors ${
                        selectedIndustry?.id === industry.id ? "bg-[#2a2e34] text-[#3CBFAE]" : "text-white"
                      }`}
                      onClick={() => onIndustrySelect(industry)}
                    >
                      {industry.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Equipment list */}
            <div className="w-2/3 max-h-64 overflow-y-auto">
              <ul className="py-2">
                {equipment
                  .filter((item) => !selectedIndustry || item.industry_id === selectedIndustry.id)
                  .map((item) => (
                    <li key={item.id}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-[#2a2e34] transition-colors flex items-center gap-2 ${
                          selectedEquipment?.id === item.id ? "bg-[#2a2e34] text-[#3CBFAE]" : "text-white"
                        }`}
                        onClick={() => handleEquipmentSelect(item)}
                      >
                        <Cpu className="h-4 w-4 text-[#3CBFAE]" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector; 