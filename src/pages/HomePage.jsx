import React from "react";
import Header from "../components/global/Header";
import HeroSection from "../components/global/HeroSection";
import IndustrySelection from "../components/homepage/IndustrySelection";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#030d13] text-white flex flex-col items-center">
      <Header />
      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto py-12">
        <HeroSection />
        <IndustrySelection />
      </main>
    </div>
  );
};

export default HomePage;
