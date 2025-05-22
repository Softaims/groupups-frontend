import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (selectedEquipment) => {
  const { messages, addMessage, clearMessages, setChatCompletionPercent, removeLastMessage } = useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!selectedEquipment || !isConnected) return;
    console.log("equipment", selectedEquipment);
    clearMessages();
    socket.emit("sendMessage", { type: selectedEquipment.id, messages: [] });
  }, [selectedEquipment, isConnected, clearMessages]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("message", message);
      removeLastMessage();
      addMessage(message);
      setChatCompletionPercent(message.progress);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [addMessage]);

  return { messages };
};
