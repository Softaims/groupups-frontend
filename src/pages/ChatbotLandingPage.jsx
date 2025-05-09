import BrandingPanel from "../components/ChatbotLandingPage/BrandingPanel";
import WelcomeSection from "../components/ChatbotLandingPage/WelcomeSection";
import Header from "../components/global/Header";
import { industryData } from "../constants/industriesData";
import { useParams, Navigate } from "react-router-dom";
export const ChatbotLandingPage = () => {
  const { industryId } = useParams();
  const { equipmentId } = useParams();
  const selectedIndustry = industryData?.find((industry) => industry.id === industryId);
  const selectedEquipment = selectedIndustry?.equipments?.find((equipment) => equipment.id == equipmentId);

  if (!selectedIndustry || !selectedEquipment) {
    return <Navigate to={"/404"} />;
  }

  return (
    <div className="min-h-screen bg-[#041018] flex flex-col">
      <Header />
      <WelcomeSection equipment={selectedEquipment} industry={selectedIndustry} />
      <BrandingPanel />
    </div>
  );
};

export default ChatbotLandingPage;
