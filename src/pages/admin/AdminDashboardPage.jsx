import AdminDashboardMain from "../../components/admin-components/admin-dashboard-components/AdminDashboardMain";
import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";

export function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminDashboardMain />
    </div>
  );
}

export default AdminDashboardPage;
