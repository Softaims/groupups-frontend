import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (equipmentId) => {
  const { messages, addMessage, clearMessages, setChatCompletionPercent, removeLastMessage } = useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!equipmentId || !isConnected) return;
    console.log("socket is there", isConnected);
    clearMessages();
    socket.emit("sendMessage", { type: equipmentId, messages: [] });
  }, [equipmentId, isConnected, clearMessages]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      removeLastMessage();
      addMessage({ role: message.role, content: message.content });
      setChatCompletionPercent(message.progress);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [addMessage]);

  return { messages };
};
