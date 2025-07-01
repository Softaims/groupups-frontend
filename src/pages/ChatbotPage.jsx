import ChatInterface from "../components/ChatbotPage/ChatInterface";
import ProductRecommendationInterface from "../components/ChatbotPage/ProductRecommendationInterface";
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "../components/ui/Resizable";
import { useIsLargeScreen } from "../hooks/useIsLargeScreen";
export const ChatbotPage = () => {
  const isLarge = useIsLargeScreen();

  return (
    <div className="flex flex-col h-screen bg-[#041018]">
      {isLarge ? (
        <div className="hidden lg:block flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={60} minSize={30}>
              <ChatInterface />
            </ResizablePanel>
            <ResizableHandle className="w-1 bg-[#002121]/30" />
            <ResizablePanel defaultSize={40} minSize={40}>
              <ProductRecommendationInterface />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ) : (
        <div className="flex flex-col lg:hidden flex-1 overflow-hidden">
          <div className="h-1/2 overflow-hidden border-b border-[#024544]/30">
            <ChatInterface />
          </div>
          <div className="h-1/2 overflow-hidden">
            <ProductRecommendationInterface />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
