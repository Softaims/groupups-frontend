import React from "react";

const EquipmentButton = ({ name, selectedEquipment, setSelectedEquipment }) => {
  return (
    <button
      onClick={() => setSelectedEquipment(name)}
      className={`${
        selectedEquipment === name
          ? "bg-black border border-[#4aa6a4]"
          : "border border-[#187775]/30 hover:border-[#4aa6a4] transition-colors"
      } cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-6 `}
    >
      <span className="text-white">{name}</span>
    </button>
  );
};

export default EquipmentButton;
