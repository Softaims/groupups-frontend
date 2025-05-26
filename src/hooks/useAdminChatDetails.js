import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/apiClient";
import { toast } from "react-toastify";

const useAdminChatDetails = () => {
  const { interactionId } = useParams();
  const [interactionDetailS, setInteractionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  useEffect(() => {
    const fetchInteractionDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/chatbot/interactions/${interactionId}`);
        setInteractionDetails(response.data || {});
      } catch (err) {
        toast.error(err.message || "Failed to fetch chat details");
        setInteractionDetails({});
      } finally {
        setIsLoading(false);
      }
    };
    if (interactionId) {
      fetchInteractionDetails();
    }
  }, [interactionId]);

  const handleToggleExpand = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  return {
    interactionDetailS,
    isLoading,
    expandedQuestionId,
    handleToggleExpand,
  };
};

export default useAdminChatDetails;
