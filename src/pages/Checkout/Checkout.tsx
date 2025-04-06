import React, { useState } from 'react';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

interface ShippingInfo {
    name: string;
    address: string;
    city: string;
    zip: string;
}

interface PaymentInfo {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

const Checkout: React.FC = () => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        name: '',
        address: '',
        city: '',
        zip: ''
    });

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [orderSummary, setOrderSummary] = useState<CartItem[]>([
        { name: 'Tent', price: 120, quantity: 1 },
        { name: 'Sleeping Bag', price: 40, quantity: 2 },
    ]);

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const totalAmount = orderSummary.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col space-y-8">
                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Shipping Information</h2>
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

                {/* Payment Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Payment Information</h2>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
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

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
                    <ul className="space-y-4 mt-4">
                        {orderSummary.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4 font-semibold text-lg">
                        <span>Total</span>
                        <span>${totalAmount}</span>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button className="w-full bg-green-500 text-white py-3 rounded-md text-xl hover:bg-green-600 transition duration-300">
                        Complete Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
