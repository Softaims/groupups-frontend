import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminQuestionsMain from "../../components/admin-components/admin-questions-components/AdminQuestionsMain";

export function AdminQuestionsPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminQuestionsMain />
    </div>
  );
}

export default AdminQuestionsPage;
