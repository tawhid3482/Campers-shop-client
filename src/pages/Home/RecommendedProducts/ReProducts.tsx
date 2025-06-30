import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products";
import { useMemo } from "react";
import { Star } from "lucide-react";

const ReProducts = () => {
  const { data } = useGetAllProductsQuery(undefined);
  const products: TProduct[] = useMemo(() => {
    return (data?.data || [])
      .filter((product: TProduct) => product.productType === "bestSelling")
      .slice(0, 8);
  }, [data]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#833d47]">
        Best Selling & Recommended
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product: TProduct) => {
          const stars = Math.round(product.rating || 4.5);
          return (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < stars ? "#facc15" : "none"}
                    stroke={i < stars ? "#facc15" : "#d1d5db"}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.rating?.toFixed(1) || "4.5"})
                </span>
              </div>

              <p className="text-green-600 font-bold">Price: {product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="block text-center bg-green-600 hover:bg-[#833d47] text-white p-1 rounded transition"
              >
                View Details
              </Link>
            </div>
          );
        })}
       
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/shop"
          className="bg-[#833d47] text-white p-2 rounded-lg text-lg font-medium hover:bg-[#6b2d38] transition"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};

export default ReProducts;
