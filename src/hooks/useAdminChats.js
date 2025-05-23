import { useState, useEffect } from "react";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";
import api from "../utils/apiClient";
import { toast } from "react-toastify";

const useAdminChats = () => {
  const { equipment } = useIndustryEquipmentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("all");
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

  const handleEquipmentChange = (e) => {
    setSelectedEquipment(e.target.value);
  };

  return {
    interactions,
    isLoading,
    equipment,
    selectedEquipment,
    searchQuery,
    handleSearchChange,
    handleEquipmentChange,
  };
};

export default useAdminChats;
