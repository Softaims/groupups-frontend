import React from "react";
import Header from "../components/global/Header";
import HeroSection from "../components/global/HeroSection";
import EquipmentSelection from "../components/EquipmentSelectionPage/EquipmentSelection";
import { useParams, Navigate } from "react-router-dom";
import { industryData } from "../constants/industriesData";
const EquipmentSelectionPage = () => {
  const { industryId } = useParams();
  const selectedIndustry = industryData?.find((industry) => industry.id === industryId);

  if (!selectedIndustry) {
    return <Navigate to={"/404"} />;
  }
  return (
    <div className="min-h-screen bg-[#030d13] text-white flex flex-col items-center">
      <Header />
      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto py-12">
        <HeroSection />
        <EquipmentSelection equipments={selectedIndustry?.equipments} />
      </main>
    </div>
  );
};

export default EquipmentSelectionPage;
