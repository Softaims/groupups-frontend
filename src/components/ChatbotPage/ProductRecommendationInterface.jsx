import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";
import { useChatStore } from "../../store/chatStore";
import EmptyRecommendedProductsState from "./EmptyRecommendedProductsState";
const ProductRecommendationInterface = () => {
  const recommendedProducts = useChatStore((state) => state.recommendedProducts);
  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-6 bg-[#000000]/20">
      <div className="container max-w-none @container">
        <div className="px-2 @3xl:px-20 px-2 space-y-4 md:space-y-6">
          <h2 className="text-base md:text-lg text-[#787878] mt-16 mb-4 md:mb-6">
            {recommendedProducts ? "Here are the products that are the right fit for your needs." : `Analyzing your needs`}
          </h2>

          {!recommendedProducts ? (
            [1, 2, 3].map((item) => <SkeletonProductCard key={item} />)
          ) : recommendedProducts?.length == 0 ? (
            <EmptyRecommendedProductsState />
          ) : (
            recommendedProducts.map((product, index) => <ProductCard key={product.id} index={index + 1} product={product} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendationInterface;
