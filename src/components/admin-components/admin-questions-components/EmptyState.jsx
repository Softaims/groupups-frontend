import { HelpCircle, Plus } from "lucide-react";

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <HelpCircle className="h-10 w-10 text-[#3CBFAE]" />
      </div>

      <h3 className="text-xl font-medium text-white mb-2">No questions yet</h3>
      <p className="text-gray-400 max-w-md mb-6">
        Add your first question for this equipment. Questions will be shown to clients in the order you arrange them.
      </p>
      <button
        onClick={onAddClick}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add First Question</span>
      </button>
    </div>
  );
};

export default EmptyState;
