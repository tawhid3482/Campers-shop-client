import { useState } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.gif";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation(); // Get current route

  // Navigation items
  const navItems = ["home", "shop", "about", "contact"];

  return (
    <nav className="bg-[#90c63e] p-4 text-white">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 md:w-14" alt="Logo" />
          <Link to="/" className="text-lg md:text-xl font-bold">
            Campers Shop
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          {navItems.map((item) => {
            const path = item === "home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path; // Check if active

            return (
              <li key={item}>
                <NavLink
                  to={path}
                  className={`px-4 py-2 rounded transition duration-200 ${
                    isActive
                      ? "bg-[#833d47] text-white"
                      : "hover:bg-[#833d47] hover:text-white"
                  }`}
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Icons and Authentication */}
        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          <Link
            to="/wishlist"
            className={`hover:bg-[#833d47] p-1 rounded-lg ${
              location.pathname === "/wishlist" ? "bg-[#833d47]" : ""
            }`}
          >
            <Heart size={22} />
          </Link>
          <Link
            to="/cart"
            className={`hover:bg-[#833d47] p-1 rounded-lg ${
              location.pathname === "/cart" ? "bg-[#833d47]" : ""
            }`}
          >
            <ShoppingCart size={22} />
          </Link>

          {/* Login/Profile & Logout */}
          <div className="hidden md:flex">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded ${
                    location.pathname === "/profile"
                      ? "bg-[#3b4927]"
                      : "bg-[#3b4927] hover:bg-[#2d3820]"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="px-3 py-2 bg-[#833d47] hover:bg-[#692f38] text-white rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-2 rounded ${
                  location.pathname === "/login"
                    ? "bg-[#833d47]"
                    : "bg-[#833d47] hover:bg-[#3b4927]"
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#692f38] text-white py-3">
          <ul className="flex flex-col items-center space-y-4">
            {navItems.map((item) => {
              const path = item === "home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;

              return (
                <li key={item}>
                  <NavLink
                    to={path}
                    className={`block px-4 py-2 rounded transition duration-200 ${
                      isActive ? "bg-[#90c63e]" : "hover:bg-[#90c63e]"
                    }`}
                  >
                    {item}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
