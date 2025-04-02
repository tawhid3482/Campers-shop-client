export type TCart = {
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