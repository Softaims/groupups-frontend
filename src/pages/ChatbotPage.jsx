import ChatInterface from "../components/ChatbotPage/ChatInterface";
import ProductRecommendationInterface from "../components/ChatbotPage/ProductRecommendationInterface";
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "../components/ui/Resizable";

export const ChatbotPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#041018]">
      {/* For Smaller Screens */}
      <div className="flex flex-col lg:hidden flex-1 overflow-hidden">
        <div className="h-1/2 overflow-hidden border-b border-[#024544]/30">
          <ChatInterface />
        </div>
        <div className="h-1/2 overflow-hidden">
          <ProductRecommendationInterface />
        </div>
      </div>

      {/* For Large Screens */}
      <div className="hidden lg:block flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={30}>
            <ChatInterface />
          </ResizablePanel>
          <ResizableHandle className="w-1 bg-[#002121]/30" />
          <ResizablePanel defaultSize={70} minSize={40}>
            <ProductRecommendationInterface />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatbotPage;
