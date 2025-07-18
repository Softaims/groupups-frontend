import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../../store/chatStore";

const SendMessageForm = () => {
  const [inputValue, setInputValue] = useState("");
  const streamingMessageId = useChatStore((state) => state.streamingMessageId);
  const isLLMLoading = useChatStore((state) => state.isLLMLoading);
  const setIsLLMLoading = useChatStore((state) => state.setIsLLMLoading);
  const addMessage = useChatStore((state) => state.addMessage);
  const isChatCompleted = useChatStore((state) => state.isChatCompleted);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsLLMLoading(true);
      addMessage({ role: "user", content: JSON.stringify({ content: { responseText: inputValue } }) });
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (isLLMLoading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <>
      {!isChatCompleted && (
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
            <button
              disabled={isLLMLoading || streamingMessageId != null}
              type="submit"
              className="absolute bottom-5 right-2 bg-[#e5e7eb] hover:bg-[#4aa6a4] transition-colors rounded-full p-1.5"
            >
              <ArrowUp className="w-4 h-4 text-black" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SendMessageForm;
