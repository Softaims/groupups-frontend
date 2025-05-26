import { useEffect, useState } from "react";
import api from "../utils/apiClient";
import { Building2, Cpu, HelpCircle, MessageSquare } from "lucide-react";

const useAdminStats = () => {
  const [countStats, setCountStats] = useState([
    { title: "Total Industries", value: "", icon: Building2, change: "" },
    { title: "Total Equipment", value: "", icon: Cpu, change: "" },
    { title: "Total Questions", value: "", icon: HelpCircle, change: "" },
    { title: "Active Chats", value: "", icon: MessageSquare, change: "" },
  ]);
  const [industryChartData, setIndustryChartData] = useState(null);
  const [equipmentChartData, setEquipmentChartData] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await api.get(`/stats/counts`);
      const updatedStats = [
        {
          title: "Total Industries",
          value: response.data.totalIndustries,
          icon: Building2,
          change: `${response.data.addedIndustriesLastMonth} added this month`,
        },
        {
          title: "Total Equipment",
          value: response.data.totalEquipment,
          icon: Cpu,
          change: `${response.data.addedEquipmentLastMonth} added this month`,
        },
        {
          title: "Total Questions",
          value: response.data.totalQuestions,
          icon: HelpCircle,
          change: `${response.data.addedQuestionsLastMonth} added this month`,
        },
        {
          title: "Active Chats",
          value: response.data.totalActiveChats,
          icon: MessageSquare,
          change: `${response.data.activeChatsSinceYesterday} since yesterday`,
        },
      ];
      setCountStats(updatedStats);
    } catch {
      console.log("error fetching stats");
    }
  };
  const fetchInteractionStats = async () => {
    try {
      const response = await api.get(`/stats/interactions`);
      setIndustryChartData(response.data?.industryData);
      setEquipmentChartData(response.data?.equipmentData);
    } catch {
      console.log("error fetching stats");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchInteractionStats();
  }, []);

  return {
    countStats,
    industryChartData,
    equipmentChartData,
  };
};

export default useAdminStats;
