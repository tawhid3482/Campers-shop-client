/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/Components/ui/card";
import { useGetAdminStatsQuery } from "@/redux/features/user/userApi";
import {
  FaUsers,
  FaMoneyBill,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useGetAllPaymentItemsQuery } from "@/redux/features/payment/paymentApi";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const { data: stats } = useGetAdminStatsQuery("");
  const adminInfo = stats?.data;

  const { data: paymentHistory } = useGetAllPaymentItemsQuery("");

  // Daily revenue formatting for recharts
  const chartData = adminInfo?.dailyRevenue?.map((item: any) => ({
    date: item._id,
    revenue: item.total,
  }));

  // Monthly revenue for PieChart
  const pieData = adminInfo?.monthlyRevenue?.map((item: any) => ({
    name: item._id,
    value: item.total,
  }));

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-700"
      >
        Admin Dashboard Overview
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <FaMoneyBill className="text-green-500 text-2xl" />,
            label: "Total Revenue",
            value: `$${adminInfo?.totalRevenue?.toFixed(2)}`,
          },
          {
            icon: <FaUsers className="text-blue-500 text-2xl" />,
            label: "Total Users",
            value: adminInfo?.totalUsers,
          },
          {
            icon: <FaClipboardList className="text-yellow-500 text-2xl" />,
            label: "Total Orders",
            value: adminInfo?.totalOrders,
          },
          {
            icon: <FaCheckCircle className="text-green-600 text-2xl" />,
            label: "Confirmed Orders",
            value: adminInfo?.totalConfirmedOrders,
          },
          {
            icon: <FaClock className="text-orange-400 text-2xl" />,
            label: "Pending Orders",
            value: adminInfo?.pendingOrders,
          },
          {
            icon: <FaClock className="text-[#692f38] text-2xl" />,
            label: "Shipping Orders",
            value: adminInfo?.shippingOrders,
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex items-center gap-4">
                {stat.icon}
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Daily Revenue Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Daily Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Bar dataKey="revenue" fill="#90c63e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Revenue Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {pieData?.map((_:any, index:any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Payments Table (Only 3) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white shadow-lg rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Recent Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentHistory?.data?.slice(0, 3)?.map((item: any, index: number) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.user?.name || "N/A"}</td>
                  <td className="px-4 py-2">{item.transactionId}</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    ${item.amount?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{item.paymentMethod}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        item.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
