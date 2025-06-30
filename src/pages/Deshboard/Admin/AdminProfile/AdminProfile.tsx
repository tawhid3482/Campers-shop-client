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

  const chartData = adminInfo?.dailyRevenue?.map((item: any) => ({
    date: item._id,
    revenue: item.total,
  }));

  const pieData = adminInfo?.monthlyRevenue?.map((item: any) => ({
    name: item._id,
    value: item.total,
  }));

  const statsCards = [
    {
      icon: <FaMoneyBill className="text-green-500 text-3xl" />, label: "Total Revenue", value: `$${adminInfo?.totalRevenue?.toFixed(2)}`,
    },
    {
      icon: <FaUsers className="text-blue-500 text-3xl" />, label: "Total Users", value: adminInfo?.totalUsers,
    },
    {
      icon: <FaClipboardList className="text-yellow-500 text-3xl" />, label: "Total Orders", value: adminInfo?.totalOrders,
    },
    {
      icon: <FaCheckCircle className="text-green-600 text-3xl" />, label: "Confirmed Orders", value: adminInfo?.totalConfirmedOrders,
    },
    {
      icon: <FaClock className="text-orange-400 text-3xl" />, label: "Pending Orders", value: adminInfo?.pendingOrders,
    },
    {
      icon: <FaClock className="text-[#692f38] text-3xl" />, label: "Shipping Orders", value: adminInfo?.shippingOrders,
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-700"
      >
        Admin Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardContent className="flex items-center gap-4 p-5">
                {stat.icon}
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData?.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white shadow-md rounded-xl p-6"
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