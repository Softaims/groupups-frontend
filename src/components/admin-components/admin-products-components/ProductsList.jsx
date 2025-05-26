import { Edit, Trash2, Package } from "lucide-react";

const ProductsList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="bg-[#0c0f12] border border-[#2a2e34] rounded-md overflow-hidden"
        >
          <div className="flex items-stretch">
            <div className={`w-1.5 bg-blue-500`}></div>
            <div className="flex-grow p-3 flex items-start gap-3">
              <div className="flex items-center justify-center p-1 mt-1">
                <Package className="h-5 w-5 text-[#3CBFAE]" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a1e24] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-white">{product.name}</h4>
                  {product.is_featured && <span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-0.5 rounded">Featured</span>}
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
                    <span className="text-gray-300">${product.price}</span>
                  </div>
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
                      <span className="text-green-400">In Stock ({product.stock})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
                      <span className="text-red-400">Out of Stock</span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">{product.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Edit Product"
                >
                  <Edit className="h-4 w-4 text-[#3CBFAE]" />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="p-1.5 rounded-md hover:bg-[#1a1e24] transition-colors"
                  title="Delete Product"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList; 