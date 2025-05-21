import BrandingPanel from "../components/ChatbotLandingPage/BrandingPanel";
import WelcomeSection from "../components/ChatbotLandingPage/WelcomeSection";
import Header from "../components/global/Header";

export const ChatbotLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#041018] flex flex-col">
      <Header />
      <WelcomeSection />
      <BrandingPanel />
    </div>
  );
};

export default ChatbotLandingPage;
