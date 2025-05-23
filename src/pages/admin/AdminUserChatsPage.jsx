import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminUserChatsMain from "../../components/admin-components/admin-user-chats-components/AdminUserChatsMain";

export function AdminUserChatsPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminUserChatsMain />
    </div>
  );
}

export default AdminUserChatsPage; 