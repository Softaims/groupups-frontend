import { useState, useRef, useEffect } from "react";
import { chatData } from "../../constants/chatData";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";
import HeaderMd from "../global/HeaderMd";

const ChatInterface = () => {
  const [messages, setMessages] = useState(chatData);
  const chatScrollRef = useRef(null);
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="w-full flex flex-col h-full border-r border-[#024544]/30">
      <HeaderMd />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={chatScrollRef}></div>
      </div>

      <SendMessageForm messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default ChatInterface;
