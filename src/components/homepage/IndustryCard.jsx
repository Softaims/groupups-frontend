import React from "react";

const IndustryCard = ({ icon: Icon, name }) => {
  return (
    <button className="border border-[#187775]/30 rounded-lg p-4 pt-14 flex flex-col items-center justify-end gap-6 hover:border-[#4aa6a4] transition-colors">
      <Icon />
      <span className="text-white">{name}</span>
    </button>
  );
};

export default IndustryCard;
