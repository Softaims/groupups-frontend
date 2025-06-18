import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 mb-16">
      <div className="bg-[#4AA6A4]/14 text-[#F9FAFB] px-4 py-2 rounded-lg text-sm mb-8">This should take ~5 minutes.</div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        Find the Right Medical Equipment
        <br />
        <span className="flex items-center justify-center gap-2">
          with <span className="text-[#4aa6a4]">AI-Powered Precision</span>
        </span>
      </h1>
      <p className="text-[#eeeeee]/41 max-w-2xl">
        GroupUps guides you to the right equipment based on your practice’s specific needs, while also getting you the best pricing.
      </p>
    </div>
  );
};

export default HeroSection;
