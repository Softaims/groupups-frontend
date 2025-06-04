import { Plus } from "lucide-react";

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="text-center py-10">
      <div className="mx-auto w-24 h-24 bg-[#0c0f12] rounded-full flex items-center justify-center mb-4">
        <Plus className="h-12 w-12 text-[#3CBFAE]" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">No AI snippets yet</h3>
      <p className="text-gray-400 mb-6">Add your first AI training snippet to get started</p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3CBFAE] text-white rounded-md hover:bg-[#35ab9c] transition-colors"
      >
        <Plus className="h-5 w-5" />
        Add AI Snippet
      </button>
    </div>
  );
};

export default EmptyState; 