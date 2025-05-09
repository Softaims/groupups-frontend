import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#030d13] sticky top-0 z-50 w-full py-5  border-b border-[#024544]/30">
      <div onClick={() => navigate("/")} className="ml-8 text-white cursor-pointer font-bold text-3xl">
        group<span className="text-[#4aa6a4]">ups</span>
      </div>
    </header>
  );
};

export default Header;
