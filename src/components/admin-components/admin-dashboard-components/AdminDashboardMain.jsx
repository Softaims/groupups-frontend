import { Building2, Cpu, HelpCircle, MessageSquare, Plus, Search, Bell } from "lucide-react";
import StatsCard from "./StatsCard";
import RecentActivityTable from "./RecentActivityTable";
import IndustryInteractionsChart from "./IndustryInteractionChart";
import EquipmentInteractionsChart from "./EquipmentInteractionChart";
const AdminDashboardMain = () => {
  const stats = [
    { title: "Total Industries", value: "12", icon: Building2, change: "+2 added this month" },
    { title: "Total Equipment", value: "143", icon: Cpu, change: "+15 added this month" },
    { title: "Total Questions", value: "87", icon: HelpCircle, change: "+5 added this month" },
    { title: "Active Chats", value: "24", icon: MessageSquare, change: "+8 since yesterday" },
  ];

  const activities = [
    {
      id: 1,
      type: "industry",
      action: "added",
      name: "Orthopedics",
      user: "Admin",
      time: "2 hours ago",
      icon: Building2,
    },
    {
      id: 2,
      type: "equipment",
      action: "updated",
      name: "Digital X-Ray Machine",
      user: "Admin",
      time: "3 hours ago",
      icon: Cpu,
    },
    {
      id: 3,
      type: "question",
      action: "added",
      name: "What is the warranty period?",
      user: "Admin",
      time: "5 hours ago",
      icon: HelpCircle,
    },
    {
      id: 4,
      type: "chat",
      action: "responded",
      name: "Support ticket #1234",
      user: "Admin",
      time: "6 hours ago",
      icon: MessageSquare,
    },
  ];
  const industryData = {
    overall: {
      labels: ["Dental", "Veterinarian", "Vision Professional"],
      values: [143, 55, 40],
    },
    lastWeek: {
      labels: ["Dental", "Veterinarian", "Vision Professional"],
      values: [42, 18, 12],
    },
  };

  // Equipment interaction data
  const equipmentData = {
    overall: {
      labels: ["CBCT", "Dental Chairs", "2D Pano", "X-Ray Machine", "Ultrasound"],
      values: [85, 62, 45, 38, 25],
    },
    lastWeek: {
      labels: ["CBCT", "Dental Chairs", "2D Pano", "X-Ray Machine", "Ultrasound"],
      values: [24, 18, 12, 10, 8],
    },
  };

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold tracking-tight break-words text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your industries, equipment, and user interactions.</p>
          </div>
          {/* <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md bg-[#1a1e24] pl-8 py-2 md:w-[200px] lg:w-[300px] border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
              />
            </div>
            <button className="relative p-2 rounded-md bg-[#1a1e24] border border-[#2a2e34] w-12 sm:w-auto">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3CBFAE] text-[10px] font-medium text-white">
                3
              </span>
            </button>
          </div> */}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard stat={stat} key={index} />
          ))}
        </div>

        <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          <IndustryInteractionsChart data={industryData} />
          <EquipmentInteractionsChart data={equipmentData} />
        </div>
        <RecentActivityTable activities={activities} />
      </div>
    </main>
  );
};

export default AdminDashboardMain;
