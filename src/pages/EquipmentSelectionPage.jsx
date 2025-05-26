import Header from "../components/global/Header";
import HeroSection from "../components/global/HeroSection";
import EquipmentSelection from "../components/EquipmentSelectionPage/EquipmentSelection";

const EquipmentSelectionPage = () => {
  return (
    <div className="min-h-screen bg-[#030d13] text-white flex flex-col items-center">
      <Header />
      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto py-12">
        <HeroSection />
        <EquipmentSelection />
      </main>
    </div>
  );
};

export default EquipmentSelectionPage;
