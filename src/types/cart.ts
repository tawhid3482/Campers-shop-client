export type TCart = {
  _id:string;
    user: string;
    items: [
      {
        product: string;
        quantity: number;
        price: number;
      }
    ];
    totalAmount: number;
}