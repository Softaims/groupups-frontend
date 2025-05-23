import { useState, useEffect } from "react";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";
import api from "../utils/apiClient";
import { toast } from "react-toastify";

const useAdminChats = () => {
  const { industries } = useIndustryEquipmentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllInteractions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/chatbot/interactions`);
      setInteractions(response.data?.interactions || []);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setInteractions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInteractions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  return {
    interactions,
    isLoading,
    industries,
    selectedIndustry,
    searchQuery,
    handleSearchChange,
    handleIndustryChange,
    refreshInteractions: fetchAllInteractions,
  };
};

export default useAdminChats;
