import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminUserChatDetailsMain from "../../components/admin-components/admin-user-chats-components/AdminUserChatDetailsMain";

export function AdminUserChatDetailsPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminUserChatDetailsMain />
    </div>
  );
}

export default AdminUserChatDetailsPage; 