import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserCartQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/features/hook";
import { Trash2 } from "lucide-react";
import { TCart } from "@/types/cart";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const Cart = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: cartData } = useGetUserCartQuery(user?.userEmail || "");
//   const [updateCart] = useUpdateCartMutation();
//   const [removeFromCart] = useRemoveFromCartMutation();
  
  const cartItems = cartData?.data?.items || [];
  console.log(cartItems)
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item: TCart) => (
            <Card key={item._id} className="flex items-center justify-between p-4">
              <CardContent className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500">Price: ${item.product.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="font-bold">Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </CardContent>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => updateCart({ id: item._id, quantity: item.quantity + 1 })}>
                  +
                </Button>
                <Button variant="outline" onClick={() => updateCart({ id: item._id, quantity: Math.max(1, item.quantity - 1) })}>
                  -
                </Button>
                <Button variant="destructive" onClick={() => removeFromCart({ id: item._id })}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: ${cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Proceed to Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;