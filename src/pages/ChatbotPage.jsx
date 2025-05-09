import { useState } from "react";
import ChatInterface from "../components/ChatbotPage/ChatInterface";
import ProductRecommendationInterface from "../components/ChatbotPage/ProductRecommendationInterface";
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "../components/ui/Resizable";
import { useParams, Navigate } from "react-router-dom";
import { industryData } from "../constants/industriesData";
import { chatData } from "../constants/chatData";

export const ChatbotPage = () => {
  const { industryId } = useParams();
  const { equipmentId } = useParams();
  const [messages, setMessages] = useState(chatData);

  const selectedIndustry = industryData?.find((industry) => industry.id === industryId);
  const selectedEquipment = selectedIndustry?.equipments?.find((equipment) => equipment.id == equipmentId);

  if (!selectedIndustry || !selectedEquipment) {
    return <Navigate to={"/404"} />;
  }
  return (
    <div className="flex flex-col h-screen bg-[#041018]">
      {/* For Smaller Screens */}
      <div className="flex flex-col md:hidden flex-1 overflow-hidden">
        <div className="h-1/2 overflow-hidden border-b border-[#024544]/30">
          <ChatInterface messages={messages} setMessages={setMessages} />
        </div>
        <div className="h-1/2 overflow-hidden">
          <ProductRecommendationInterface messagesLength={messages?.length} />
        </div>
      </div>

      {/* For Large Screens */}
      <div className="hidden md:block flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={30}>
            <ChatInterface messages={messages} setMessages={setMessages} />
          </ResizablePanel>
          <ResizableHandle className="w-1 bg-[#002121]/30" />
          <ResizablePanel defaultSize={70} minSize={40}>
            <ProductRecommendationInterface messagesLength={messages?.length} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatbotPage;
