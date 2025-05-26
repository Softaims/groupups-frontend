import React from "react";
import { Building2 } from "lucide-react";

const EmptyIndustriesState = () => {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <Building2 className="h-10 w-10 text-[#3CBFAE]" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No Industries Available</h3>
      <p className="text-gray-400 max-w-md">
        There are currently no industries available. Please check back later.
      </p>
    </div>
  );
};

export default EmptyIndustriesState; 