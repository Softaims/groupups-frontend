import { useState } from "react";
import { Edit, Trash2, Package, DollarSign, Info } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-[#0c0f12] border border-[#2a2e34] rounded-lg overflow-hidden hover:border-[#3CBFAE] transition-colors">
      <div className="relative h-48 bg-[#1a1e24]">
        {!imageLoaded && <div className="absolute inset-0 bg-[#2a2e34] animate-pulse" />}

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a1e24]">
            <Package className="h-16 w-16 text-[#3CBFAE] opacity-50" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 rounded-md bg-[#1a1e24] hover:bg-[#2a2e34] transition-colors"
            title="Edit Product"
          >
            <Edit className="h-4 w-4 text-[#3CBFAE]" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-2 rounded-md bg-[#1a1e24] hover:bg-[#2a2e34] transition-colors"
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium text-white flex-1">{product.name}</h3>
          <div className="flex items-center gap-1 px-3 py-1 bg-[#1a1e24] rounded-full">
            <DollarSign className="h-4 w-4 text-[#3CBFAE]" />
            <span className="text-white font-medium">{product.price}</span>
          </div>
        </div>
        {product.description && (
          <div className="space-y-1">
            <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
          </div>
        )}

        {product.why_good_fit_reason && (
          <div className="space-y-1 pt-2 border-t border-[#2a2e34]">
            <div className="flex items-center gap-1 text-[#3CBFAE]">
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium">Why Good Fit</span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2">{product.why_good_fit_reason}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
