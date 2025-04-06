import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserCartQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/features/hook";
import { useCreateOrdersMutation } from "@/redux/features/order/orderApi";
import { TCart } from "@/types/cart";

const Checkout: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: cartData } = useGetUserCartQuery(user?.userEmail || "");
  const cartItems = (cartData as { data: TCart[] } | undefined)?.data || [];

  // States for shipping and payment information
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Mutation to create the order
  const [createOrder] = useCreateOrdersMutation();

  // Handle changes in shipping input fields
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes in payment input fields
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate the total amount for the order
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (acc, item) =>
        acc + item.items[0]?.product?.price * item.items[0]?.quantity,
      0
    );
  };

  const handleSubmit = async () => {
    const orderPayload = {
      user: user?.id,
      items: cartItems.map((item) => ({
        product: item.items[0]?.product?._id,
        quantity: item.items[0]?.quantity,
        price: item.items[0]?.product?.price,
      })),
      totalAmount: calculateTotalAmount(),
      status: "Pending", // You can adjust this as needed
      paymentMethod: "Card", // You can adjust based on the user's choice
      shippingAddress: shippingInfo,
    };

    // Call the createOrder mutation
    try {
      await createOrder(orderPayload);
      // Optionally clear the cart or show a success message here
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col space-y-8">
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
            type="text"
            name="zip"
            value={shippingInfo.zip}
            onChange={handleShippingChange}
            placeholder="Zip Code"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
          <ul className="space-y-4 mt-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between">
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

        {/* Payment Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Payment Information
          </h2>
          <input
            type="text"
            name="cardNumber"
            value={"paymentInfo.cardNumber"}
            onChange={"handlePaymentChange"}
            placeholder="Card Number"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="expiry"
              value={paymentInfo.expiry}
              onChange={handlePaymentChange}
              placeholder="Expiry Date"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              placeholder="CVV"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 rounded-md text-xl hover:bg-green-600 transition duration-300"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
