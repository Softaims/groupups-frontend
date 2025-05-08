import React from "react";

const Message = ({ message }) => {
  return (
    <div className={`max-w-[90%] md:max-w-[80%] ${message.sender === "user" ? "ml-auto" : ""}`}>
      <div className={`rounded-2xl p-3 md:p-4 ${message.sender === "user" ? "bg-[#4AA6A4]/55 text-white" : "bg-[#D9D9D9]/5 text-white"}`}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
