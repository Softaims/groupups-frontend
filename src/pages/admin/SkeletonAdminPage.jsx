import SkeletonAdminSidebar from "../../components/admin-components/admin-global/SkeletonAdminSidebar";

export function SkeletonAdminPage() {
  return (
    <div className="flex min-h-screen bg-[#0c0f12]">
      <SkeletonAdminSidebar />
    </div>
  );
}

export default SkeletonAdminPage;
