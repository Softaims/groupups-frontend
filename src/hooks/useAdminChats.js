import { useState, useEffect, useCallback } from "react";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";
import api from "../utils/apiClient";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

const useAdminChats = () => {
  const { equipment } = useIndustryEquipmentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllInteractions = async (query = "") => {
    try {
      setIsLoading(true);
      const response = await api.get(`/chatbot/interactions${query}`);
      setInteractions(response.data?.interactions || []);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setInteractions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((queryString) => {
      fetchAllInteractions(queryString);
    }, 400),
    [] // debounce is only created once
  );

  useEffect(() => {
    const queryParts = [];
    if (searchQuery.trim()) queryParts.push(`user_email=${searchQuery}`);
    if (selectedEquipment !== "all") queryParts.push(`equipment_id=${selectedEquipment}`);
    const queryString = queryParts.length ? `?${queryParts.join("&")}` : "";

    debouncedFetch(queryString);
  }, [searchQuery, selectedEquipment, debouncedFetch]);

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
