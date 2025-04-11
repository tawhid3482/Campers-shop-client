import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hook";
import { useGetUserPaymentQuery } from "@/redux/features/payment/paymentApi";
import { TPayment } from "@/types/payment";

const PaymentHistory = () => {
  const user = useAppSelector(useCurrentUser);

  const { data: paymentData, isLoading } = useGetUserPaymentQuery(
    user?.userEmail || ""
  );
  console.log(paymentData);

  
  const payment =
    (paymentData as { data: TPayment[] } | undefined)?.data || [];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment History</h2>

      {isLoading ? (
        <p className="text-gray-600">Loading payment records...</p>
      ) : payment?.length === 0 ? (
        <p className="text-gray-600">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Method
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payment?.map((item: TPayment) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.paymentMethod}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${
                        item.status === "Success"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ${item.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
