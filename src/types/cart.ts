type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
  productType: string;
  isDeleted: boolean;
};

export type TCart = {
  _id: string;
  user: TUser; // ✅ Now user is an object
  items: [
    {
      product: TProduct;
      quantity: number;
      price: number;
    }
  ];
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
};
