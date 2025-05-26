import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminProductsMain from "../../components/admin-components/admin-products-components/AdminProductsMain";

export function AdminProductsPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminProductsMain />
    </div>
  );
}

export default AdminProductsPage; 