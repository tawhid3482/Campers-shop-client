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
} from "recharts";
import { motion } from "framer-motion";

const AdminProfile = () => {
  const { data: stats,  } = useGetAdminStatsQuery("");
  const adminInfo = stats?.data;

  // Transforming dailyRevenue to match recharts format
  const chartData = adminInfo?.dailyRevenue?.map((item: any) => ({
    date: item._id,
    revenue: item.total,
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

      {/* Chart */}
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
    </div>
  );
};

export default AdminProfile;
