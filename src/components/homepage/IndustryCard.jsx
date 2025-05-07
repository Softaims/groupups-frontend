import React from "react";
import { useNavigate } from "react-router-dom";
const IndustryCard = ({ icon: Icon, id, name }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/${id}`)}
      className="border border-[#187775]/30 cursor-pointer rounded-lg p-4 pt-14 flex flex-col items-center justify-end gap-6 hover:border-[#4aa6a4] transition-colors"
    >
      <Icon />
      <span className="text-white">{name}</span>
    </button>
  );
};

export default IndustryCard;
