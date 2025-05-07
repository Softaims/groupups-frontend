import React from "react";

const EquipmentButton = ({ name }) => {
  return (
    <button className="border border-[#187775]/30 rounded-lg p-4 flex flex-col items-center justify-center gap-6 hover:border-[#4aa6a4] transition-colors">
      <span className="text-white">{name}</span>
    </button>
  );
};

export default EquipmentButton;
