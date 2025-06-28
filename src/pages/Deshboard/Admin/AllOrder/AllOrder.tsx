import { useState } from "react";
import { useGetAllOrderItemsQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import { TProduct } from "@/types/products";
import { Loader2 } from "lucide-react";
import moment from "moment";

const ITEMS_PER_PAGE = 3;

const AllOrder = () => {
  const { data: orderData, isLoading } = useGetAllOrderItemsQuery("");
  const orders = (orderData as { data: TOrder[] } | undefined)?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, address, city or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {paginatedOrders.map((order: TOrder) => (
            <div
              key={order._id}
              className="rounded-xl shadow-lg p-6 bg-white border hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order by</p>
                  <p className="font-medium break-words">
                    {order.shippingAddress.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Shipping Info</p>
                <p className="font-medium">Name: {order.shippingAddress.name}</p>
                <p>Address: {order.shippingAddress.address}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Zip-code: {order.shippingAddress.zipCode}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Items</p>
                <div className="space-y-4">
                  {order.items.map(
                    (item: {
                      product: string | TProduct;
                      quantity: number;
                      price: number;
                    }) => (
                      <div
                        key={
                          typeof item.product === "string"
                            ? item.product
                            : item.product._id
                        }
                        className="flex items-center"
                      >
                        {typeof item.product !== "string" && (
                          <>
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.product.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} x ${item.price}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Total: ${order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on {moment(order.createdAt).format("LLL")}
                </p>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-200 ${
                  currentPage === num
                    ? "bg-yellow-400 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
