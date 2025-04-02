type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  rating?: number;
  productType?: "regular" | "bestSelling" | "featured";
};
export type TReviews = {
  _id: string;
  product: TProduct;
  userEmail: string;
  rating: number;
  comment: string;
};
