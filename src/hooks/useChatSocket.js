import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (selectedEquipment) => {
  const {
    messages,
    addMessage,
    removeLastMessage,
    setRecommendedProducts,
    setIsChatCompleted,
    setIsLLMLoading,
    isLLMLoading,
    clearMessages,
  } = useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!selectedEquipment || !isConnected) return;
    clearMessages();
    setRecommendedProducts(null);
    socket.emit("sendMessage", { type: selectedEquipment.id, messages: [] });
    setIsLLMLoading(true);
    console.log("message sent");
  }, [selectedEquipment, isConnected, setIsLLMLoading, clearMessages, setRecommendedProducts]);

  useEffect(() => {
    return () => {
      clearMessages();
      setRecommendedProducts(null);
    };
  }, [clearMessages, setRecommendedProducts]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      const parsedMessage = JSON.parse(message.content);
      if (!isLLMLoading) return;
      console.log("is llm loading", isLLMLoading);
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
  }, [addMessage, removeLastMessage, setRecommendedProducts, setIsLLMLoading, setIsChatCompleted, messages, isLLMLoading]);

  return { messages };
};
