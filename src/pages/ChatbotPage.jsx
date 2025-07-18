import ChatInterface from "../components/ChatbotPage/ChatInterface";
import ProductRecommendationInterface from "../components/ChatbotPage/ProductRecommendationInterface";
import BrandingPanel from "../components/ChatbotLandingPage/BrandingPanel";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "../components/ui/Resizable";
import { useParams, Navigate } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import useEquipment from "../hooks/useEquipment";
import { useEffect, useState } from "react";

// Right panel placeholder with fade-in
function RightPanelPlaceholder({ show }) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full text-center transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-[#4aa6a4] font-bold text-3xl md:text-4xl tracking-tight mb-2">
        group<span className="text-white">ups</span>
      </div>
      <p className="text-[#6c6c6c] text-sm">
        You’re about to use the GroupUps chatbot.
        <br /> Once you finish, products matching your needs will display here
      </p>
    </div>
  );
}

// Right panel content logic with fade-in animation
function RightPanel({ chatDone, equipment, lastImage }) {
  const [show, setShow] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    setShow(false);
    setImgLoaded(false);
    if (!lastImage) {
      const timeout = setTimeout(() => setShow(true), 30);
      return () => clearTimeout(timeout);
    }
  }, [chatDone, lastImage, equipment && equipment.productsVisibility]);

  if (chatDone) {
    if (equipment && equipment.productsVisibility) {
      return <ProductRecommendationInterface />;
    } else {
      return <RightPanelPlaceholder show={show} />;
    }
  }
  if (lastImage) {
    return (
      <div
        className={`flex items-center justify-center w-full h-full bg-[#041018] transition-opacity duration-500 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={lastImage}
          alt="Question Visual"
          className="max-w-full max-h-[80vh] rounded shadow-lg"
          style={{ objectFit: "contain" }}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    );
  }
  return <RightPanelPlaceholder show={show} />;
}

export const ChatbotPage = () => {
  const { industryName, equipmentName } = useParams();
  const { equipment, loading } = useEquipment(industryName, equipmentName);
  const messages = useChatStore((state) => state.messages);
  const recommendedProducts = useChatStore(
    (state) => state.recommendedProducts
  );

  if (!loading && !equipment) {
    return <Navigate to={"/404"} />;
  }

  // Always parse message.content as JSON string and extract image
  let lastImage = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    let msg = messages[i];
    let parsed = null;
    if (typeof msg.content === "string") {
      try {
        parsed = JSON.parse(msg.content);
        console.log(`Parsed message at index ${i}:`, parsed);
      } catch {
        console.log(`Failed to parse message at index ${i}:`, msg.content);
        parsed = null;
      }
    }
    // If parsed has a nested content object, use that
    let image = null;
    if (parsed && parsed.content && parsed.content.image) {
      image = parsed.content.image;
    } else if (parsed && parsed.image) {
      image = parsed.image;
    }
    if (image) {
      console.log(`Found image at index ${i}:`, image);
      lastImage = image;
      break;
    }
  }
  console.log("lastImage for right panel:", lastImage);

  // Determine if chat is done and recommendations should be shown
  // We'll assume: if recommendedProducts is not null, chat is done
  const chatDone = recommendedProducts !== null;

  return (
    <div className="flex flex-col h-screen bg-[#041018]">
      <div className="block flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={60} minSize={30}>
            <ChatInterface equipment={equipment} loading={loading} />
          </ResizablePanel>
          <ResizableHandle className="w-1 bg-[#002121]/30" />
          <ResizablePanel defaultSize={40} minSize={40}>
            <RightPanel
              chatDone={chatDone}
              equipment={equipment}
              lastImage={lastImage}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatbotPage;
