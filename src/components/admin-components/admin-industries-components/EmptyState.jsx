import { Building2, Plus } from "lucide-react";

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <Building2 className="h-10 w-10 text-[#3CBFAE]" />
      </div>

      <h3 className="text-xl font-medium text-white mb-2">Welcome to Industries Management</h3>
      <p className="text-gray-400 max-w-md mb-6">
        Get started by adding your first industry. Industries help you organize equipment and questions into meaningful categories, making it easier for your clients to find what they need.
      </p>
      <button
        onClick={onAddClick}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Create Your First Industry</span>
      </button>
    </div>
  );
};

export default EmptyState;
