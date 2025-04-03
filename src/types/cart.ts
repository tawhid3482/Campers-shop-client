type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
export type TCart = {
  _id:string;
    user: string;
    items: [
      {
        product: TProduct;
        quantity: number;
        price: number;
      }
    ];
    totalAmount: number;
}