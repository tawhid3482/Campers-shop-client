export type TPayment = {
    _id: string;                    // MongoDB ObjectId as string
  user: string;                  // User's ObjectId as string
  orderId: string;               // Order's ObjectId as string
  paymentMethod: string;        // e.g., "Card", "Bkash", etc.
  transactionId: string;        // Unique transaction ID
  status: "Success" | "Failed" | "Pending"; // Status of payment
  amount: number;               // Amount paid
  createdAt: string;            // ISO Date string (e.g., 2025-04-10T05:02:04.486+00:00)
  updatedAt: string;    
}