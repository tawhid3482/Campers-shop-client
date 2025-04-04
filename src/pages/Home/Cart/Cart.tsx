/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useDeleteCartMutation, useGetUserCartQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/features/hook";
import { Trash2 } from "lucide-react";
import { TCart } from "@/types/cart";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const user = useAppSelector(useCurrentUser);

  const { data: cartData, isLoading, isError } = useGetUserCartQuery(user?.userEmail || "");

  const [deleteCart] = useDeleteCartMutation();

  const handleDelete = async (id: string) => {
    try {
      
      await deleteCart(id).unwrap();
      toast.success("Cart deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Optional: Placeholder updateCart function
  const updateCart = async ({ id, quantity }: { id: string; quantity: number }) => {
    // TODO: implement actual updateCart mutation
    console.log("Update cart:", id, quantity);
    toast.info("Cart update not yet implemented.");
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
                  <h3 className="font-semibold text-xl">{item.items[0]?.product?.name}</h3>
                  <p className="text-gray-500">Price: ${item.items[0]?.product?.price}</p>
                  <p className="text-gray-500">Quantity: {item.items[0]?.quantity}</p>
                  <p className="font-bold">
                    Total: $
                    {(item.items[0]?.product?.price * item.items[0]?.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    updateCart({
                      id: item._id,
                      quantity: item.items[0]?.quantity + 1,
                    })
                  }
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    updateCart({
                      id: item._id,
                      quantity: Math.max(1, item.items[0]?.quantity - 1),
                    })
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
                  acc + item.items[0]?.product?.price * item.items[0]?.quantity,
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
