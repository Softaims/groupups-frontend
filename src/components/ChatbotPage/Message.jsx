import SkeletonMessage from "./SkeletonMessage";

const Message = ({ message }) => {
  const isUser = message.role === "user";
  const isError = !isUser && message?.error;
  const parsedMessage = JSON.parse(message.content);

  if (!isUser && parsedMessage.content.responseText == "loading") {
    return <SkeletonMessage />;
  }
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
          rounded-2xl py-3 px-5 max-w-[70%]
          ${isUser ? "bg-[#4AA6A4]/55 text-white" : isError ? "bg-red-500/20 text-red-600" : "bg-[#D9D9D9]/5 text-white"}
        `}
      >
        {parsedMessage.content.responseText}
      </div>
    </div>
  );
};

export default Message;
