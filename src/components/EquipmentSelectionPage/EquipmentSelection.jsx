import React from "react";
import EquipmentButton from "./EquipmentButton";
import { industryData } from "../../constants/industriesData";
import { useParams } from "react-router-dom";
const EquipmentSelection = () => {
  const { industryName } = useParams();
  const selectedIndustry = industryData?.find((industry) => industry.name.toLowerCase() === industryName.toLowerCase());
  return (
    <div className="px-4 w-full">
      <h2 className="text-lg mb-8 text-[#EEEEEE]">Select Equipment you want recommendations for</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {selectedIndustry?.equipments?.map((equipment, index) => (
          <EquipmentButton key={index} name={equipment} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentSelection;
