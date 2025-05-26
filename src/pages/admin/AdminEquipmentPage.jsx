import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminEquipmentMain from "../../components/admin-components/admin-equipment-components/AdminEquipmentMain";
export function AdminEquipmentPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminEquipmentMain />
    </div>
  );
}

export default AdminEquipmentPage;
