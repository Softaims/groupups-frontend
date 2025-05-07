import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full py-5 border-b border-[#024544]/30">
      <div onClick={() => navigate("/")} className="ml-8 text-[#4aa6a4] cursor-pointer font-bold text-2xl">
        group<span className="text-white">ups</span>
      </div>
    </header>
  );
};

export default Header;
