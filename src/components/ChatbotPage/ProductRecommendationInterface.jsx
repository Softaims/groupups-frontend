import { goodFitReason, productData } from "../../constants/productsData";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";
import { useChatStore } from "../../store/chatStore";

const ProductRecommendationInterface = () => {
  const chatCompletionPercent = useChatStore((state) => state.chatCompletionPercent);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-6 bg-[#000000]/20">
      <div className="container max-w-none @container">
        <div className="px-2 @3xl:px-20 px-2 space-y-4 md:space-y-6">
          <h2 className="text-base md:text-lg text-[#787878] mt-16 mb-4 md:mb-6">
            {chatCompletionPercent === 100 ? "Here are the products that are the right fit for your needs." : `Analyzing your needs`}
          </h2>

          {productData?.map((product) =>
            chatCompletionPercent === 100 ? (
              <ProductCard key={product.id} product={product} whyGoodFit={goodFitReason} />
            ) : (
              <SkeletonProductCard key={product.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendationInterface;
