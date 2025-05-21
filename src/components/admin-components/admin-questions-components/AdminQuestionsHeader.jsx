import { Plus } from "lucide-react";

const AdminQuestionsHeader = ({ selectedEquipment, onAddClick, isLoading }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Questions Management</h1>
        <p className="text-gray-400">
          {selectedEquipment ? `Managing questions for ${selectedEquipment.name}` : "Select equipment to manage its questions"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedEquipment || isLoading}
        >
          <Plus className="h-4 w-4" />
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
};

export default AdminQuestionsHeader; 