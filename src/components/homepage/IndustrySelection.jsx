import React, { useEffect, useState } from "react";
import IndustryCard from "./IndustryCard";
import SkeletonIndustryCard from "./SkeletonIndustryCard";
import EmptyIndustriesState from "./EmptyIndustriesState";
import api from "../../utils/apiClient";

const IndustrySelection = () => {
  const [industries, setIndustries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await api.get("/industry-equipment/industries");
        setIndustries(response.data || []);
      } catch (err) {
        console.error("Failed to fetch industries:", err);
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return (
    <div className="px-4 w-full">
      <h2 className="text-lg mb-8 text-[#EEEEEE]">Select your industry first</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <SkeletonIndustryCard key={index} />)
        ) : industries?.length > 0 ? (
          industries.map((industry) => (
            <IndustryCard key={industry.id} id={industry.id} name={industry.name} industry_image={industry.industry_image} />
          ))
        ) : (
          <EmptyIndustriesState />
        )}
      </div>
    </div>
  );
};

export default IndustrySelection;
