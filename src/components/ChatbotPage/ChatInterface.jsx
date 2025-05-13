import { useRef, useEffect } from "react";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";
import HeaderMd from "../global/HeaderMd";
import { useChatStore } from "../../store/chatStore";
import { useSocketStore } from "../../store/socketStore";
import SkeletonMessage from "./SkeletonMessage";
const ChatInterface = () => {
  const chatScrollRef = useRef(null);
  const messages = useChatStore((state) => state.messages);
  const isConnected = useSocketStore((state) => state.isConnected);
  const connectionStatus = useSocketStore((state) => state.connectionStatus);
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full flex flex-col h-full border-r border-[#024544]/30">
      <HeaderMd />

      {!isConnected && connectionStatus == "disconnected" ? (
        <div className="flex-1 flex items-center justify-center text-red-400 text-sm p-4">
          Chat is currently unavailable. Please check your connection.
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
            {messages?.length > 0 ? (
              messages.map((message, index) => {
                if (message.role === "assistant" && message.content === "loading") {
                  return <SkeletonMessage key={index} />;
                } else {
                  return <Message key={index} message={message} />;
                }
              })
            ) : (
              <SkeletonMessage />
            )}
            <div ref={chatScrollRef}></div>
          </div>
          <SendMessageForm />
        </>
      )}
    </div>
  );
};

export default ChatInterface;
