import AdminSidebar from "../../components/admin-components/admin-global/AdminSidebar";
import AdminAISnippetsMain from "../../components/admin-components/admin-ai-snippets-components/AdminAISnippetsMain";

export function AdminTrainingAISnippetsPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <AdminSidebar />
      <AdminAISnippetsMain />
    </div>
  );
}

export default AdminTrainingAISnippetsPage; 