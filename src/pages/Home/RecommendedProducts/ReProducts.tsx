import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products";
import { useMemo } from "react";

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
        {products?.map((product: TProduct) => (
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
            <p className="text-[#90c63e] font-bold">{product.price}</p>
            <Link
              to={`/products/${product._id}`}
              className="block text-center bg-[#90c63e] hover:bg-[#833d47] text-white py-2 mt-3 rounded transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/shop"
          className="bg-[#833d47] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#6b2d38] transition"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};

export default ReProducts;
