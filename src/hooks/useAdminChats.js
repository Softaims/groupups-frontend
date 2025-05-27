import { useState, useEffect, useCallback } from "react";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";
import api from "../utils/apiClient";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

const useAdminChats = () => {
  const { equipment } = useIndustryEquipmentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [interactions, setInteractions] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    total_pages: 1,
  });

  const fetchAllInteractions = async (query = "") => {
    try {
      setIsLoading(true);
      const response = await api.get(`/chatbot/interactions${query}`);
      setInteractions(response?.data?.interactions || []);
      setPagination(
        response?.data?.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          total_pages: 1,
        }
      );
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
    queryParts.push(`page=${currentPage}`);
    queryParts.push(`limit=${pagination.limit}`);
    const queryString = queryParts.length ? `?${queryParts.join("&")}` : "";

    debouncedFetch(queryString);
  }, [searchQuery, selectedEquipment, currentPage, pagination.limit, debouncedFetch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleEquipmentChange = (e) => {
    setSelectedEquipment(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    interactions,
    isLoading,
    equipment,
    selectedEquipment,
    searchQuery,
    currentPage,
    pagination,
    handleSearchChange,
    handleEquipmentChange,
    handlePageChange,
  };
};

export default useAdminChats;
