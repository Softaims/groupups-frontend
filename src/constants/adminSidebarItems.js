import { Building2, Cpu, HelpCircle, Home, MessageSquare, Settings, User } from "lucide-react";

export const adminSidebarItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Building2, label: "Industries", path: "/admin/industries" },
  { icon: Cpu, label: "Equipment", path: "/admin/equipment" },
  { icon: HelpCircle, label: "Questions", path: "/admin/questions" },
  { icon: MessageSquare, label: "User Chats", path: "/admin/chats" },
  { icon: User, label: "Profile", path: "/admin/profile" },
];
