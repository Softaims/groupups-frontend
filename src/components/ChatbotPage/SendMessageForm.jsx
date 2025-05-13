import { ArrowUp } from "lucide-react";
import { useState } from "react";
import socket from "../../lib/socket";
import { useParams } from "react-router-dom";
import { useChatStore } from "../../store/chatStore";

const SendMessageForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { equipmentId } = useParams();
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      socket?.emit("sendMessage", { type: equipmentId, messages: [...messages, { role: "user", content: inputValue }] });
      addMessage({ role: "user", content: inputValue });
      addMessage({ role: "assistant", content: "loading" });
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <form onSubmit={sendMessage} className="p-3 md:p-4">
      <div className="relative">
        <textarea
          rows={3}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write anything you want"
          className="w-full resize-none bg-[#ffffff]/5 text-white rounded-3xl py-3 px-4 pr-12 focus:outline-none placeholder:text-[#ffffff]/19 text-sm"
        />
        <button type="submit" className="absolute bottom-5 right-2 bg-[#e5e7eb] hover:bg-[#4aa6a4] transition-colors rounded-full p-1.5">
          <ArrowUp className="w-4 h-4 text-black" />
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;
