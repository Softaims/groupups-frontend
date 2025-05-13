import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (selectedEquipment) => {
  const { messages, addMessage, clearMessages, setChatCompletionPercent, removeLastMessage } = useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!selectedEquipment || !isConnected) return;
    clearMessages();
    socket.emit("sendMessage", { type: selectedEquipment.id, messages: [] });
  }, [selectedEquipment, isConnected, clearMessages]);

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
