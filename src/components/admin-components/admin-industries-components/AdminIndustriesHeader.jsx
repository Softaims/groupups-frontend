import { Plus } from "lucide-react";

const AdminIndustriesHeader = ({ onAddNew }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight break-words text-white">Industries</h1>
        <p className="text-gray-400">Manage your industries and their details.</p>
      </div>
      <button
        onClick={onAddNew}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3CBFAE] hover:bg-[#35a99a] text-white rounded-md transition-colors cursor-pointer"
      >
        <Plus size={20} />
        <span>Add Industry</span>
      </button>
    </div>
  );
};

export default AdminIndustriesHeader; 