import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hook";
import { useGetUserOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import { TProduct } from "@/types/products";
import { Loader2 } from "lucide-react";
import moment from "moment";

const MyOrder = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: orderData, isLoading } = useGetUserOrderQuery(
    user?.userEmail || ""
  );

  const orders = (orderData as { data: TOrder[] } | undefined)?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order:TOrder) => (
            <div
              key={order._id}
              className="rounded-xl shadow-lg p-6 bg-white border hover:shadow-xl transition duration-300"
            >
              {/* Order Header */}
              <div className="mb-4 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order by</p>
                  <p className="font-medium break-words">{order.shippingAddress.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Shipping Info</p>
                <p className="font-medium">Name: {order.shippingAddress.name}</p>
                <p>Address: {order.shippingAddress.address}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Zip-code: {order.shippingAddress.zipCode}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Items</p>
                <div className="space-y-4">
                  {order.items.map((item: { product: string | TProduct; quantity: number; price: number }) => (
                    <div key={typeof item.product === "string" ? item.product : item.product._id} className="flex items-center">
                      {typeof item.product !== "string" && (
                        <>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">{item.product.description}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x ${item.price}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total: ${order.totalAmount}</p>
                <p className="text-sm text-gray-500">
                  Ordered on {moment(order.createdAt).format("LLL")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
