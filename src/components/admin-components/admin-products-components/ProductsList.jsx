import { Edit, Trash2, Package, DollarSign, Info } from "lucide-react";

const ProductsList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#0c0f12] border border-[#2a2e34] rounded-lg overflow-hidden hover:border-[#3CBFAE] transition-colors"
        >
          {/* Product Header with Image */}
          <div className="relative h-48 bg-[#1a1e24]">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#1a1e24]">
                <Package className="h-16 w-16 text-[#3CBFAE] opacity-50" />
              </div>
            )}
            {/* Action Buttons */}
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

          {/* Product Details */}
          <div className="p-4 space-y-4">
            {/* Name and Price */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium text-white flex-1">{product.name}</h3>
              <div className="flex items-center gap-1 px-3 py-1 bg-[#1a1e24] rounded-full">
                <DollarSign className="h-4 w-4 text-[#3CBFAE]" />
                <span className="text-white font-medium">{product.price}</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-1">
                <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
              </div>
            )}

            {/* Why Good Fit Reason */}
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
      ))}
    </div>
  );
};

export default ProductsList;
