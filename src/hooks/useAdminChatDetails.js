import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/apiClient";
import { toast } from "react-toastify";

const useAdminChatDetails = () => {
  const { interactionId } = useParams();
  const [interactionDetailS, setInteractionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInteractionDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/chatbot/interactions/${interactionId}`);
        setInteractionDetails(response.data || {});
      } catch {
        toast.error("Something went wrong");
        setInteractionDetails({});
      } finally {
        setIsLoading(false);
      }
    };
    if (interactionId) {
      fetchInteractionDetails();
    }
  }, [interactionId]);

  return {
    interactionDetailS,
    isLoading,
  };
};

export default useAdminChatDetails;
