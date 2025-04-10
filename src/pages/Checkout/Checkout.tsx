import React, { useState } from "react";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserCartQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/features/hook";
import { useCreateOrdersMutation } from "@/redux/features/order/orderApi";
import { TCart } from "@/types/cart";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useCreatePaymentsMutation } from "@/redux/features/payment/paymentApi";

const Checkout = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: cartData } = useGetUserCartQuery(user?.userEmail || "");
  const cartItems = (cartData as { data: TCart[] } | undefined)?.data || [];
  const { data: users } = useGetUserQuery(user?.userEmail || "");

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  // const [paymentInfo, setPaymentInfo] = useState({
  //   cardNumber: "",
  //   expiry: "",
  //   cvv: "",
  // });

  const [createOrder] = useCreateOrdersMutation();
  const [createPayments] = useCreatePaymentsMutation();

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaymentInfo({
  //     ...paymentInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (acc, item) =>
        acc + item.items[0]?.product?.price * item.items[0]?.quantity,
      0
    );
  };

  const handlePayment = async (orderId: string) => {
    const paymentPayload = {
      user: users?.data?._id,
      orderId,
      paymentMethod: "Card",
      transactionId: "",
      status: "Pending",
      amount: calculateTotalAmount(),
    };
    try {
      const res = await createPayments(paymentPayload).unwrap();
      console.log("Payment created:", res);
      if (res?.data) {
        window.location.replace(res.data);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const orderPayload = {
      user: users?.data?._id,
      items: cartItems.map((item) => ({
        product: item.items[0]?.product?._id,
        quantity: item.items[0]?.quantity,
        price: item.items[0]?.product?.price,
      })),
      totalAmount: calculateTotalAmount(),
      status: "Pending",
      orderStatus:"Pending",
      shippingAddress: shippingInfo,
    };

    try {
      const orderResponse = await createOrder(orderPayload).unwrap();
      console.log("Order created:", orderResponse);
      console.log("Order created_id:", orderResponse?.data?._id);
      if (orderResponse?.data?._id) {
        await handlePayment(orderResponse?.data?._id);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="flex flex-col space-y-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
          <ul className="space-y-4 mt-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>
                  {item.items[0]?.product?.name} (x{item.items[0]?.quantity})
                </span>
                <span>
                  ${item.items[0]?.product?.price * item.items[0]?.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 font-semibold text-lg">
            <span>Total</span>
            <span>${calculateTotalAmount()}</span>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Shipping Information
          </h2>
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            placeholder="Full Name"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            placeholder="Address"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            placeholder="City"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            placeholder="Zip Code"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            placeholder="Phone Number"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#90c63e] text-white py-3 rounded-md text-xl hover:bg-[#833d47] transition duration-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
