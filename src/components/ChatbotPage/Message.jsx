import SkeletonMessage from "./SkeletonMessage";
import StreamingMessage from "./StreamingMessage";
import { useChatStore } from "../../store/chatStore";

const Message = ({ message, isStreaming = false }) => {
  const clearStreamingMessageId = useChatStore((state) => state.clearStreamingMessageId);
  const isUser = message.role === "user";
  const isError = !isUser && message?.error;
  const parsedMessage = JSON.parse(message.content);

  if (!isUser && parsedMessage.content.responseText == "loading") {
    return <SkeletonMessage />;
  }

  // For user messages, show immediately
  if (isUser) {
    return (
      <div className="flex justify-end mb-2">
        <div className="rounded-2xl py-3 px-5 max-w-[70%] bg-[#4AA6A4]/55 text-white">
          {parsedMessage.content.responseText}
        </div>
      </div>
    );
  }

  // For assistant messages, use streaming effect
  if (!isUser && isStreaming) {
    return (
      <StreamingMessage 
        content={parsedMessage.content.responseText} 
        onComplete={() => {
          clearStreamingMessageId();
        }}
      />
    );
  }

  // For completed assistant messages, show full text
  return (
    <div className="flex justify-start mb-2">
      <div
        className={`
          rounded-2xl py-3 px-5 max-w-[70%]
          ${isError ? "bg-red-500/20 text-red-600" : "bg-[#D9D9D9]/5 text-white"}
        `}
      >
        {parsedMessage.content.responseText}
      </div>
    </div>
  );
};

export default Message;
