import { Cpu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyEquipmentState = () => {
  const navigate = useNavigate();

  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <Cpu className="h-10 w-10 text-[#3CBFAE]" />
      </div>

      <h3 className="text-xl font-medium text-white mb-2">No Equipment Available</h3>
      <p className="text-gray-400 max-w-md mb-6">
        We haven't added any equipment for this industry yet. Please check back later or try a different industry.
      </p>

      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a99a] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Industries</span>
      </button>
    </div>
  );
};

export default EmptyEquipmentState;
