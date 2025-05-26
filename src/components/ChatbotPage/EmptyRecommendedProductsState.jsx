import { PackageX } from "lucide-react";

const EmptyRecommendedProductsState = () => {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-[#0c0f12] p-4 rounded-full mb-4">
        <PackageX className="h-10 w-10 text-[#3CBFAE]" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No Products Found</h3>
      <p className="text-gray-400 max-w-md">
        We couldn't find any suitable products based on your input. Try changing your responses or check back later.
      </p>
    </div>
  );
};

export default EmptyRecommendedProductsState;
