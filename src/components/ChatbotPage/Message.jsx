const Message = ({ message }) => {
  const isUser = message.role === "user";
  const parsed = isUser ? { content: message.content } : JSON.parse(message.content);
  const isError = !isUser && parsed?.error;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
          rounded-2xl py-3 px-5 max-w-[70%]
          ${isUser ? "bg-[#4AA6A4]/55 text-white" : isError ? "bg-red-500/20 text-red-600" : "bg-[#D9D9D9]/5 text-white"}
        `}
      >
        {parsed.content}
      </div>
    </div>
  );
};

export default Message;
