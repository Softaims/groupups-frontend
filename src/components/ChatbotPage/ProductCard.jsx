import React, { useState } from "react";
import { X, Globe } from "lucide-react";
import VideoIcon from "../../../public/icons/VideoIcon";
import GoodFitIcon from "../../../public/icons/GoodFitIcon";
import FOVIcon from "../../../public/icons/FOVIcon";
import BudgetIcon from "../../../public/icons/BudgetIcon";

const ProductCard = ({ product, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative perspective-1000">
      <div className={`relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
        {/* Front of card */}
        <div className={`w-full backface-hidden ${isFlipped ? "hidden" : "block"}`}>
          <div className="relative overflow-hidden bg-[#D9D9D9]/5 rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-center leading-relaxed">
            <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <div className="bg-[#041018] rounded-xl p-2 relative border border-[#FFFFFF]/10 flex items-center justify-center">
                <div className="absolute top-[-4px] left-[-4px] bg-[#1a2a2f] text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs">
                  {index}
                </div>
                {product.image && <img src={product.image} alt={product.name} className="w-full md:w-50 md:h-50" />}
                {/* {product.logo && <div className="absolute bottom-2 right-2 text-center text-xs text-gray-400">{product.image}</div>} */}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-[#FFFFFF] mr-6 text-sm 2xl:text-lg">{product.name}</h3>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="pt-0.5">
                    <FOVIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  </div>
                  <p className="mr-6 text-wrap break-words">Description: {product.description}</p>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="pt-0.5">
                    <BudgetIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  </div>
                  <p className="mr-6 text-wrap break-words">Price: {product.price}</p>
                </div>

                {/* <div className="flex items-start space-x-2">
                  <div className="pt-0.5">
                    <FOVIcon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  </div>
                  <p className="mr-6 text-wrap break-words">{product.price}</p>
                </div> */}
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setIsFlipped(true)}
                  className="cursor-pointer bg-white font-bold text-black px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm"
                >
                  Why good fit
                </button>
                {/* <button className="bg-[#4aa6a4] font-bold text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-[#3d8d8b] transition-colors">
                  View Demo
                </button> */}
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
        </div>

        {/* Back of card */}
        <div className={`w-full backface-hidden rotate-y-180 ${isFlipped ? "block" : "hidden"}`}>
          <div className="relative overflow-hidden bg-[#D9D9D9]/5 rounded-lg p-4 md:p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-base md:text-lg text-white">Why good fit</h3>
              <button onClick={() => setIsFlipped(false)} className="cursor-pointer text-gray-400 hover:text-white transition-colors">
                <X className="w-8 h-8 bg-[#1D403F]/40 rounded-full p-2" />
              </button>
            </div>
            <div>
              <p className="text-[#A0A0A0] text-xs md:text-sm leading-relaxed">{product.why_good_fit_reason}</p>
            </div>
            <div className="mt-4 flex justify-end">
              {/* <button className="bg-[#4AA6A4] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:bg-[#3d8d8b] transition-colors">
                View Demo
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
