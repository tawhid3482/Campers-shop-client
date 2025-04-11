import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaCreditCard,
  FaRegStar,
  FaCartPlus,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";
import { useAppSelector } from "@/redux/features/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const DashboardLayout = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-gray-800 to-gray-600 text-white p-6">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
          Dashboard
        </h2>

        <ul className="space-y-6">
          {user?.role === "customer" ? (
            <>
              <li>
                <NavLink
                  to="/user/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaUser className="mr-3" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/myOrder"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaList className="mr-3" /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaCreditCard className="mr-3" /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/dashboard/reviews"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaRegStar className="mr-3" /> Reviews
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard/adminProfile"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaUser className="mr-3" /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/rsd"
                  className={({ isActive }) =>
                    `flex items-center text-lg transition duration-300 ease-in-out ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  <FaRegStar className="mr-3" /> Reviews
                </NavLink>
              </li>
            </>
          )}

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="px-4 text-gray-300">Or</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center text-lg transition duration-300 ease-in-out ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              <FaHome className="mr-3" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `flex items-center text-lg transition duration-300 ease-in-out ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              <FaShoppingBag className="mr-3" /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center text-lg transition duration-300 ease-in-out ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              <FaCartPlus className="mr-3" /> Cart
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
