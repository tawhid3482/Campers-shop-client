/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetUserCartQuery,
  useUpdateCartMutation,
} from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/features/hook";
import { Trash2 } from "lucide-react";
import { TCart } from "@/types/cart";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Cart = () => {
  const user = useAppSelector(useCurrentUser);

  const {
    data: cartData,
    isLoading,
    isError,
  } = useGetUserCartQuery(user?.userEmail || "");

  const [deleteCart] = useDeleteCartMutation();
  const [updateCartMutation] = useUpdateCartMutation();

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteCart(id).unwrap();
        Swal.fire("Deleted!", "Your Cart has been deleted.", "success");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ✅ Updated cart quantity handler (FIXED)
  const updateCart = async (
    id: string,
    productId: string,
    newQuantity: number,
    price: number
  ) => {
    try {
      const currentCartItem = cartItems.find((item) => item._id === id);
      if (!currentCartItem) return;

      const userId = currentCartItem.user._id;

      const payload = {
        user: userId,
        items: [
          {
            product: productId,
            quantity: newQuantity,
            price: price,
          },
        ],
        totalAmount: price * newQuantity,
      };

      await updateCartMutation({ id, data: payload }).unwrap();
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  if (isLoading) return <p>Loading your cart...</p>;
  if (isError) return <p>There was an error loading your cart.</p>;

  const cartItems = (cartData as { data: TCart[] } | undefined)?.data || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item: TCart) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between p-2 bg-gray-200 gap-5"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
                <img
                  src={item.items[0]?.product?.image}
                  alt={item.items[0]?.product?.name}
                  className="w-64 h-auto max-h-48 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-xl">
                    {item.items[0]?.product?.name}
                  </h3>
                  <p className="text-gray-500">
                    Price: ${item.items[0]?.product?.price}
                  </p>
                  <p className="text-gray-500">
                    Quantity: {item.items[0]?.quantity}
                  </p>
                  <p className="font-bold">
                    Total: $
                    {(
                      item.items[0]?.product?.price * item.items[0]?.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    updateCart(
                      item._id,
                      item.items[0].product._id,
                      item.items[0].quantity + 1,
                      item.items[0].product.price
                    )
                  }
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    updateCart(
                      item._id,
                      item.items[0].product._id,
                      Math.max(1, item.items[0].quantity - 1),
                      item.items[0].product.price
                    )
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() => handleDelete(item._id)}
                  variant="destructive"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: $
            {cartItems
              .reduce(
                (acc: number, item: TCart) =>
                  acc +
                  item.items[0]?.product?.price * item.items[0]?.quantity,
                0
              )
              .toFixed(2)}
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
