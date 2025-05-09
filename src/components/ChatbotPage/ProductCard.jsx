import React from "react";
import { X, Globe } from "lucide-react";
import VideoIcon from "../../../public/icons/VideoIcon";
import GoodFitIcon from "../../../public/icons/GoodFitIcon";
import FOVIcon from "../../../public/icons/FOVIcon";
import BudgetIcon from "../../../public/icons/BudgetIcon";
const ProductCard = ({ product }) => {
  return (
    <div className={`relative overflow-hidden bg-[#D9D9D9]/5 rounded-lg p-4 md:p-5 flex flex-col md:flex-row leading-relaxed`}>
      <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-6">
        <div className="bg-[#041018] rounded-xl p-2 relative border border-[#FFFFFF]/10 flex items-center justify-center">
          <div className="absolute top-[-4px] left-[-4px] bg-[#1a2a2f] text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs">
            {product.id}
          </div>
          {product.image && <img src="/images/dummy_dental_picture.png" alt={product.title} className="w-full md:w-50 md:h-50" />}
          {product.logo && <div className="absolute bottom-2 right-2 text-center text-xs text-gray-400">{product.logo}</div>}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-base text-[#FFFFFF] md:text-lg mr-6">{product.title}</h3>
        </div>

        <div className="space-y-2 text-xs md:text-sm text-gray-400">
          <div className="flex items-start space-x-2">
            <div className="pt-0.5">
              <FOVIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            </div>
            <p className="mr-6 text-wrap break-words">{product.fov}</p>
          </div>

          <div className="flex items-start space-x-2">
            <div className="pt-0.5">
              <BudgetIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            </div>
            <p className="mr-6 text-wrap break-words">{product.budget}</p>
          </div>

          <div className="flex items-start space-x-2">
            <div className="pt-0.5">
              <FOVIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            </div>
            <p className="mr-6 text-wrap break-words">{product.warranty}</p>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="bg-white font-bold text-black px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm">Why good fit</button>
          <button className="bg-[#4aa6a4] font-bold text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-[#3d8d8b] transition-colors">
            View Demo
          </button>
        </div>
      </div>

      <div className="bg-[#D9D9D9]/2 absolute top-0 right-0 p-4 flex flex-col space-y-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Globe className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <VideoIcon className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <GoodFitIcon className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
