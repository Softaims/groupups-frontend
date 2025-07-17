import ChatInterface from "../components/ChatbotPage/ChatInterface";
import ProductRecommendationInterface from "../components/ChatbotPage/ProductRecommendationInterface";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "../components/ui/Resizable";
import { useParams, Navigate } from "react-router-dom";

import useEquipment from "../hooks/useEquipment";

export const ChatbotPage = () => {
  const { industryName, equipmentName } = useParams();

  const { equipment, loading } = useEquipment(industryName, equipmentName);

  if (!loading && !equipment) {
    return <Navigate to={"/404"} />;
  }
  console.log("equipment", equipment);
  return (
    <div className="flex flex-col h-screen bg-[#041018]">
      <div className="block flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={60} minSize={30}>
            <ChatInterface equipment={equipment} loading={loading} />
          </ResizablePanel>
          {equipment && equipment.productsVisibility && (
            <>
              <ResizableHandle className="w-1 bg-[#002121]/30" />
              <ResizablePanel defaultSize={40} minSize={40}>
                <ProductRecommendationInterface />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatbotPage;
