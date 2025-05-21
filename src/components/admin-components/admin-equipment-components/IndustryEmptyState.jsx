import { Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IndustryEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <Building2 className="h-10 w-10 text-[#3CBFAE]" />
      </div>

      <h3 className="text-xl font-medium text-white mb-2">No Industries Available</h3>
      <p className="text-gray-400 max-w-md mb-6">
        To start managing equipment, you need to add an industry first. Industries help organize your equipment into meaningful categories for your clients.
      </p>
      <button
        onClick={() => navigate("/admin/industries")}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#3CBFAE] text-white hover:bg-[#35a89a] transition-colors"
      >
        <span>Go to Industries</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default IndustryEmptyState; 