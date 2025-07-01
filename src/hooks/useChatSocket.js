import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import socket from "../lib/socket";
import { useSocketStore } from "../store/socketStore";

export const useChatSocket = (selectedEquipment) => {
  const { messages, addMessage, setRecommendedProducts, setIsChatCompleted, setIsLLMLoading, isLLMLoading, clearMessages } = useChatStore();
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    console.log("llm", isLLMLoading);
    if (!selectedEquipment || !isConnected || !isLLMLoading) return;
    socket.emit("sendMessage", { type: selectedEquipment.id, messages: messages });
    setIsLLMLoading(true);
    console.log("message sent");
  }, [selectedEquipment, isConnected, setIsLLMLoading, messages, isLLMLoading]);

  useEffect(() => {
    return () => {
      setRecommendedProducts(null);
      clearMessages();
      setIsLLMLoading(true);
    };
  }, [clearMessages, setRecommendedProducts, setIsLLMLoading]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      const parsedMessage = JSON.parse(message.content);
      if (!isLLMLoading) return;
      console.log("parsed", parsedMessage);
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
  }, [addMessage, setRecommendedProducts, setIsLLMLoading, setIsChatCompleted, messages, isLLMLoading]);

  return { messages };
};
