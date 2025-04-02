import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products";
import { useMemo } from "react";
import { Link } from "react-router-dom";



const FeaturedProducts = () => {

    const { data } = useGetAllProductsQuery(undefined);
    const products: TProduct[] = useMemo(() => {
      return (data?.data || [])
        .filter((product: TProduct) => product.productType === "featured")
        .slice(0, 8);
    }, [data]);
  


  return (
    <section className="py-10  ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B2D38] mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</p>

              <Link
                to={`/products/${product._id}`}
                className="block mt-3 text-center bg-[#90c63e] text-white  py-2 px-4 rounded-lg hover:bg-[#833d47] transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="bg-[#833d47] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
