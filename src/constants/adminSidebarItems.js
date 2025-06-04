import { Building2, Cpu, HelpCircle, Home, MessageSquare, Settings, User, Package, Brain } from "lucide-react";

export const adminSidebarItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Building2, label: "Industries", path: "/admin/industries" },
  { icon: Cpu, label: "Equipment", path: "/admin/equipment" },
  { icon: HelpCircle, label: "Questions", path: "/admin/questions" },
  { icon: Brain, label: "AI Snippets", path: "/admin/ai-snippets" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: MessageSquare, label: "User Chats", path: "/admin/chats" },
  // { icon: User, label: "Profile", path: "/admin/profile" },
];
