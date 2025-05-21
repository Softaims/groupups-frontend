import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IndustryCard = ({ name, industry_image }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      onClick={() => navigate(`/${name}`)}
      className="border border-[#187775]/30 cursor-pointer rounded-lg p-4 pt-14 flex flex-col items-center justify-end gap-6 hover:border-[#4aa6a4] transition-colors relative"
    >
      <div className="relative w-12 h-12">
        {!imageLoaded && <div className="absolute inset-0 bg-[#187775]/20 rounded-full animate-pulse" />}
        <img
          src={industry_image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <span className="text-white">{name}</span>
    </button>
  );
};

export default IndustryCard;
