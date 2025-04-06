export type TOrder = {
  user: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
    zipCode: string;
  };
};
