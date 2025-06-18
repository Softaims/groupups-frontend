import React from "react";

const BrandingPanel = () => {
  return (
    <div className="z-20 bg-[#000000]/20 absolute top-0 right-0 h-full w-[60%] p-6 md:p-10 hidden lg:flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#4aa6a4] font-bold text-3xl md:text-4xl tracking-tight mb-2">
          group<span className="text-white">ups</span>
        </div>
        <p className="text-[#6c6c6c] text-sm">
          You’re about to use the GroupUps chatbot.
          <br /> Once you finish, products matching your needs will display here
        </p>
      </div>
    </div>
  );
};

export default BrandingPanel;
