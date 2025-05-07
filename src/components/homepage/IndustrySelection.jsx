import React from "react";
import IndustryCard from "./IndustryCard";
import { industryData } from "../../constants/industriesData";
const IndustrySelection = () => {
  return (
    <div className="px-4 w-full">
      <h2 className="text-lg mb-8 text-[#EEEEEE]">Select your industry first</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {industryData?.map((industry, index) => (
          <IndustryCard key={index} icon={industry.icon} name={industry.name} />
        ))}
      </div>
    </div>
  );
};

export default IndustrySelection;
