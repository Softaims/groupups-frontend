import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminIndustriesMain from "../../components/admin-components/admin-industries-components/AdminIndustriesMain";

const AdminIndustriesPage = () => {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminIndustriesMain />
    </div>
  );
};

export default AdminIndustriesPage; 