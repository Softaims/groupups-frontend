import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (selectedEquipment) => {
  const { messages, addMessage, removeLastMessage, setRecommendedProducts, setIsChatCompleted, setIsLLMLoading, clearMessages } =
    useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!selectedEquipment || !isConnected) return;
    socket.emit("sendMessage", { type: selectedEquipment.id, messages: [] });
    setIsLLMLoading(true);
    console.log("message sent");
  }, [selectedEquipment, isConnected, setIsLLMLoading]);

  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      const lastMessage = messages[messages.length - 1] || "";
      if (lastMessage && lastMessage?.role === "assistant" && JSON.parse(lastMessage?.content)?.responseText == "loading") return;
      const parsedMessage = JSON.parse(message.content);
      console.log("parsed", parsedMessage);
      removeLastMessage();
      addMessage(message);
      setIsLLMLoading(false);
      setIsChatCompleted(parsedMessage.content?.isQuestionsCompleted);
      if (parsedMessage.content?.isQuestionsCompleted) {
        setRecommendedProducts(parsedMessage.content?.recommendedProducts || []);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [addMessage, removeLastMessage, setRecommendedProducts, setIsLLMLoading, setIsChatCompleted, messages]);

  return { messages };
};
