import { Cpu, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EquipmentEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <Cpu className="h-10 w-10 text-[#3CBFAE]" />
      </div>

      <h3 className="text-xl font-medium text-white mb-2">No Equipment Available</h3>
      <p className="text-gray-400 max-w-md mb-6">
        To start managing questions, you need to add equipment first. Please go to the Equipment page to add your equipment items.
      </p>
      <button
        onClick={() => {
          navigate("/admin/equipment");
        }}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors"
      >
        <span>Go to Equipment</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EquipmentEmptyState;
