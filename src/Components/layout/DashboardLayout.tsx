import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaCreditCard,
  FaRegStar,
  FaCartPlus,
  FaShoppingBag,
  FaHome,
  FaProductHunt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAppSelector } from "@/redux/features/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const DashboardLayout = () => {
  const user = useAppSelector(useCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-gradient-to-b from-gray-800 to-gray-600 text-white p-6 
          w-64 lg:w-72 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-yellow-400">Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-yellow-400">
            <FaTimes size={24} />
          </button>
        </div>

        <h2 className="hidden md:block text-2xl font-semibold text-yellow-400 mb-6">
          Dashboard
        </h2>

        <ul className="space-y-6 text-sm md:text-base">
          {/* Dynamic Menu */}
          {user?.role === "customer" ? (
            <>
              <li>
                <NavLink
                  to="/user/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                  }
                >
                  <FaUser className="mr-3" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/myOrder"
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                  }
                >
                  <FaList className="mr-3" /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                  }
                >
                  <FaCreditCard className="mr-3" /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/reviews"
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                  }
                >
                  <FaRegStar className="mr-3" /> Reviews
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/user/dashboard/profile" className={({ isActive }) =>
                  `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                }>
                  <FaUser className="mr-3" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard/adminProfile" className={({ isActive }) =>
                  `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                }>
                  <FaUser className="mr-3" /> Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard/addProduct" className={({ isActive }) =>
                  `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                }>
                  <FaRegStar className="mr-3" /> Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard/manage" className={({ isActive }) =>
                  `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                }>
                  <FaProductHunt className="mr-3" /> Manage Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard/allOrder" className={({ isActive }) =>
                  `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
                }>
                  <FaProductHunt className="mr-3" /> All Orders
                </NavLink>
              </li>
            </>
          )}

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="px-4 text-gray-300 text-xs">Or</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <li>
            <NavLink to="/" className={({ isActive }) =>
              `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
            }>
              <FaHome className="mr-3" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) =>
              `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
            }>
              <FaShoppingBag className="mr-3" /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) =>
              `flex items-center ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`
            }>
              <FaCartPlus className="mr-3" /> Cart
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Menu Toggle Button */}
        <div className="bg-gray-800 text-yellow-400 flex items-center justify-between px-4 py-3 md:hidden">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar"
            className="text-yellow-400"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
