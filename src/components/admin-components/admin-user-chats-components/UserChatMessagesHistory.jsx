const UserChatmessageHistory = ({ messagesHistory }) => {
  if (!Array.isArray(messagesHistory) || messagesHistory.length === 0) {
    return null;
  }
  return (
    <div className="mt-4 p-4 bg-[#0f1216] border border-[#1a1e24] shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Messages History
      </h2>
      <div className="flex flex-col space-y-3 max-h-[32vh] overflow-y-auto pr-2 -mr-2">
        {messagesHistory.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex flex-col mr-2 ${
                isUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-2xl py-3 px-5 max-w-[70%] whitespace-pre-line break-words relative
                  ${
                    isUser
                      ? "bg-[#4AA6A4]/55 text-white"
                      : "bg-[#D9D9D9]/5 text-white"
                  }`}
              >
                <span
                  className={`block text-xs font-semibold mb-[1px] ${
                    isUser ? "text-cyan-200" : "text-[#8ab4f8]"
                  }`}
                >
                  {isUser ? "User" : "Assistant"}
                </span>
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserChatmessageHistory;
