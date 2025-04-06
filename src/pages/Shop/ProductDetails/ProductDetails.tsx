import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../redux/features/products/productsApi";
import { Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import {
  useGetAllReviewsQuery,
  useAddReviewsMutation,
} from "@/redux/features/reviews/reviewsApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/features/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TReviews } from "@/types/reviews";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const user = useAppSelector(useCurrentUser);
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id!);

  const [addToCart] = useAddToCartMutation();
  const { data: reviews } = useGetAllReviewsQuery(undefined);

  const { data: users } = useGetUserQuery(user?.userEmail || "");
  const [addReviews] = useAddReviewsMutation();
  const product = data?.data || null;

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");

  // Filter reviews based on product ID
  const productReviews: TReviews[] =
    reviews?.data?.filter((review: TReviews) => review.product._id === id) ||
    [];

  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleReviewSubmit = async () => {
    if (!comment.trim()) return toast.error("Review comment cannot be empty!");

    try {
      await addReviews({
        product: id,
        userEmail: user?.userEmail,
        rating,
        comment,
      });
      console.log({ product: id, userEmail: user?.userEmail, rating, comment });
      setComment("");
      setRating(2);
      toast.success("Review successfully added!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleCartSubmit = async () => {
    if (!product) {
      toast.error("Product data is missing!");
      return;
    }

    try {
      await addToCart({
        user: users?.data?._id,
        items: [
          {
            product: product._id,
            quantity: quantity,
            price: product.price,
          },
        ],
        totalAmount: product.price * quantity,
      });
console.log({
  user: users?.data?._id,
  items: [
    {
      product: product._id,
      quantity: quantity,
      price: product.price,
    },
  ],
  totalAmount: product.price * quantity,
})
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-dashed border-[#833d47] rounded-full"
        />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">Error fetching product!</p>;

  if (!product)
    return <p className="text-center text-gray-500">No product found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-2 w-full h-full min-h-screen flex flex-col gap-6 items-center justify-center mx-auto bg-gray-300 shadow-lg rounded-xl text-center p-10"
    >
      <div className="grid md:grid-cols-2 gap-5 items-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-2xl h-auto rounded-xl shadow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full"
        >
          <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600 mt-4 text-lg">{product.description}</p>

          <div className="flex justify-center items-center mt-6">
            <p className=" font-bold text-xl flex items-center">
              {product.rating} <Star className="ml-2 w-6 h-6 fill-[#90c63e]" />
            </p>
            <span className="ml-3 text-gray-500 text-lg">
              ({product.stock} in stock)
            </span>
          </div>

          <p className="text-3xl font-semibold text-[#833d47] mt-6">
            ${product.price} <span className="text-sm">(Per item)</span>
          </p>

          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              onClick={handleDecrement}
              disabled={quantity === 1}
              className={`px-4 py-2 rounded-lg text-2xl ${
                quantity === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#833d47] text-white"
              }`}
            >
              -
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className={`px-4 py-2 rounded-lg text-2xl ${
                quantity >= product.stock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#833d47] text-white"
              }`}
            >
              +
            </Button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="mt-8 flex justify-center gap-6"
          >
            <Button
              onClick={handleCartSubmit}
              className="bg-[#833d47] hover:bg-[#90c63e] px-8 py-4 rounded-lg text-white font-semibold text-lg"
            >
              Add to Cart
            </Button>
            <Link to="/checkout">
            <Button className="bg-[#90c63e] hover:bg-[#833d47] px-8 py-4 rounded-lg text-white font-semibold text-lg">
              Buy Now
            </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="md:mt-20 w-full">
        <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>

        <div className="mt-4 max-h-60 overflow-y-auto bg-gray-200 p-4 rounded-lg shadow-md">
          {productReviews?.length > 0 ? (
            productReviews?.map((review: TReviews) => (
              <div
                key={review._id}
                className="border-b pb-4 mb-4 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  {/* <span className="text-xl text-[#833d47] font-semibold">
                    {review.userEmail}
                  </span> */}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{review.userEmail}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800">
            Leave a Review
          </h4>
          <div className="mt-2 flex justify-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 ${
                    star <= rating ? "text-[#833d47]" : "text-[#90c63e]"
                  }`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Write your review..."
              className="border p-2 rounded-lg w-60"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              onClick={handleReviewSubmit}
              className="bg-[#833d47] text-white px-6 py-2 rounded-lg"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
