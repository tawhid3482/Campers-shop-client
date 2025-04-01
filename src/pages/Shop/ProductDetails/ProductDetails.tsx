import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../redux/features/products/productsApi";
import { Star } from "lucide-react";
import { Button } from "@/Components/ui/button";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id!);
  const product = data?.data || null;

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching product!</p>;
  if (!product)
    return <p className="text-center text-gray-500">No product found.</p>;

  return (
    <div className="my-2 w-full h-screen flex items-center justify-center mx-auto bg-white shadow-lg rounded-xl text-center p-5">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-xl h-auto rounded-xl shadow "
          />
        </div>

        {/* Product Details */}
        <div className="text-center w-full">
          <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600 mt-4 text-lg">{product.description}</p>

          {/* Rating */}
          <div className="flex justify-center items-center mt-6">
            <p className="text-yellow-500 font-bold text-xl flex items-center">
              {product.rating} <Star className="ml-2 w-6 h-6 fill-yellow-500" />
            </p>
            <span className="ml-3 text-gray-500 text-lg">
              ({product.stock} in stock)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold text-[#833d47] mt-6">
            ${product.price}
          </p>

          {/* Buy Now & Add to Cart */}
          <div className="mt-8 flex justify-center gap-6">
            <Button className="bg-[#833d47] hover:bg-[#90c63e] px-8 py-4 rounded-lg text-white font-semibold text-lg">
              Add to Cart
            </Button>
            <Button className="bg-[#90c63e] hover:bg-[#833d47] px-8 py-4 rounded-lg text-white font-semibold text-lg">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
