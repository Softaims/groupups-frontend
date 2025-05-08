import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderMd = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full py-5 border-b border-r border-[#002121]/30">
      <div onClick={() => navigate("/")} className="ml-8 text-white cursor-pointer font-bold text-3xl">
        group<span className="text-[#4aa6a4]">ups</span>
      </div>
    </header>
  );
};

export default HeaderMd;
