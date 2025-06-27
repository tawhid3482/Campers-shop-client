/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "../../../redux/features/products/productsApi";
import {
  useGetAllReviewsQuery,
  useAddReviewsMutation,
} from "@/redux/features/reviews/reviewsApi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/features/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { TReviews } from "@/types/reviews";

const ProductDetails = () => {
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id!);
  const { data: similarProductsData } = useGetAllProductsQuery("");
  const { data: reviews } = useGetAllReviewsQuery(undefined);
  const { data: users } = useGetUserQuery(user?.userEmail || "");
  const [addToCart] = useAddToCartMutation();
  const [addReviews] = useAddReviewsMutation();

  const product = data?.data || null;
  console.log("Product Details:", product);
  const productReviews: TReviews[] =
    reviews?.data?.filter((review: TReviews) => review.product._id === id) || [];

  const suggestedProducts = similarProductsData?.data?.filter(
    (p: any) => p._id !== id && p.category.name === product?.category.name
  );

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 0;
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / productReviews.length;
  }, [productReviews]);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");
  const [activeImage, setActiveImage] = useState(product?.image?.[0] || "");

  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit a review!");
      return navigate("/login");
    }
    if (!comment.trim()) return toast.error("Review comment cannot be empty!");

    try {
      await addReviews({
        product: id,
        userEmail: user?.userEmail,
        rating,
        comment,
      });
      setComment("");
      setRating(2);
      toast.success("Review successfully added!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleCartSubmit = async () => {
    if (!user) {
      toast.error("Please login to add items to cart!");
      return navigate("/login");
    }
    if (!product) return toast.error("Product data is missing!");

    try {
      await addToCart({
        user: users?.data?._id,
        items: [{ product: product._id, quantity, price: product.price }],
        totalAmount: product.price * quantity,
      });
      toast.success("Product added to cart successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-dashed border-[#833d47] rounded-full"
        />
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error fetching product!</p>;
  if (!product) return <p className="text-center text-gray-500">No product found.</p>;

  // Set initial active image once data is available
  if (!activeImage && product?.image?.[0]) {
    setActiveImage(product.image[0]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-8 w-full px-6 max-w-7xl mx-auto space-y-16"
    >
      {/* Product Details Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
        <div>
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-[420px] object-contain rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.image.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition duration-300 ${
                  img === activeImage ? "border-[#833d47]" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-[#833d47] tracking-wide">
            {product.name}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

          {/* Price */}
          <p className="text-3xl font-bold text-[#90c63e]">
            ${product.price.toFixed(2)}{" "}
            <span className="text-base font-normal text-gray-500">per item</span>
          </p>
          <p className="text-xl font-bold text-[#833d47]">
           Rating: {product.rating.toFixed(1)} ⭐️
          </p>

          {/* Stock */}
          <p
            className={`text-lg font-semibold ${
              product.stock > 10
                ? "text-green-600"
                : product.stock > 0
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          <div className="flex items-center gap-6">
            <Button
              onClick={handleDecrement}
              disabled={quantity === 1}
              className="bg-[#833d47] hover:bg-[#622933] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-5 py-2 shadow-md transition"
            >
              −
            </Button>
            <span className="text-3xl font-semibold">{quantity}</span>
            <Button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="bg-[#833d47] hover:bg-[#622933] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-5 py-2 shadow-md transition"
            >
              +
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mt-6">
            <Button
              onClick={handleCartSubmit}
              disabled={product.stock === 0}
              className="bg-gradient-to-r from-[#833d47] to-[#b0525b] hover:from-[#a33d46] hover:to-[#802d39] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </Button>
            <Link to="/checkout" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-[#90c63e] to-[#6c8e1e] hover:from-[#a1ce43] hover:to-[#4b6010] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition w-full">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Star Rating & Reviews */}
      <section className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row gap-8 max-h-[450px] overflow-y-auto">
        <div className="md:w-1/2 flex flex-col items-center justify-center border-r border-gray-300 pr-6">
          <h2 className="text-3xl font-bold mb-6 text-[#833d47]">Star Rating</h2>
          <div className="flex items-center gap-3 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-10 h-10 ${
                  i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
                } transition-colors duration-300`}
              />
            ))}
            <span className="ml-3 text-xl font-semibold text-gray-800">
              {averageRating.toFixed(1)} / 5
            </span>
          </div>
          <span className="text-gray-500 text-lg">({productReviews.length} reviews)</span>
        </div>

        <div className="md:w-1/2 overflow-y-auto max-h-[380px] pl-6">
          <h2 className="text-3xl font-bold mb-6 text-[#833d47]">Customer Reviews</h2>
          {productReviews.length ? (
            productReviews.map((review) => (
              <div
                key={review._id}
                className="p-5 mb-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-2">
                  <p className="font-semibold text-lg text-gray-900">{review.userEmail}</p>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg text-center">No reviews yet.</p>
          )}
        </div>
      </section>

      {/* Leave a Review */}
      <section className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-5">Leave a Review</h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  star <= rating
                    ? "text-yellow-500 hover:text-yellow-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star className="w-8 h-8" />
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow border border-gray-300 rounded-xl px-5 py-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#833d47] transition"
          />
          <Button
            onClick={handleReviewSubmit}
            className="bg-gradient-to-r from-[#833d47] to-[#b0525b] hover:from-[#a33d46] hover:to-[#802d39] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition"
          >
            Submit
          </Button>
        </div>
      </section>

      {/* Suggested Products */}
      {suggestedProducts?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-[#90c63e]">Suggested Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((item: any) => (
              <Link
                to={`/products/${item._id}`}
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-xl font-semibold text-gray-900">{item.name}</p>
                <p className="text-[#833d47] font-bold text-lg">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default ProductDetails;
