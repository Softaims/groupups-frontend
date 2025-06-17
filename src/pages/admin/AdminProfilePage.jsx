import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminProfileMain from "../../components/admin-components/admin-profile-components/AdminProfileMain";

export function AdminProfilePage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminProfileMain />
    </div>
  );
}

export default AdminProfilePage; 