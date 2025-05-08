import React from "react";
import { useState } from "react";
import EquipmentButton from "./EquipmentButton";
import { useNavigate, useParams } from "react-router-dom";

const EquipmentSelection = ({ equipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const { industryId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="px-4 w-full">
      <h2 className="text-lg mb-8 text-[#EEEEEE]">Select Equipment you want recommendations for</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {equipments?.map((equipment, index) => (
          <EquipmentButton
            key={index}
            equipment={equipment}
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
          />
        ))}
      </div>

      <button
        onClick={() => navigate(`/${industryId}/${selectedEquipment?.id}`)}
        disabled={!selectedEquipment}
        className={`${
          selectedEquipment ? "bg-[#FFFFFF]" : "bg-[#4AA6A4]/14"
        } cursor-pointer text-black font-bold rounded-full p-4 flex flex-col items-center justify-center gap-6 mt-10 mx-auto`}
      >
        Find My Ideal Equipment
      </button>
    </div>
  );
};

export default EquipmentSelection;
