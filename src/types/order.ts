import { MomentInput } from "moment";

export type TOrder = {
  createdAt: MomentInput;
  _id?:string,
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
    createdAt: string; 
  };
};
