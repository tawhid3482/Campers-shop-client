/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  UserCircle,
} from "lucide-react";
import { Link, useLocation, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.gif";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { useGetUserCartQuery } from "@/redux/features/cart/cartApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { data: cart } = useGetUserCartQuery(user?.userEmail || "");
  const cartItems = (cart as { data: any[] } | undefined)?.data || [];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Tips", path: "/tips" },
    { name: "Services", path: "/services" },
  ];

  const megaMenuItems = [
    { title: "Tents", id: "Tents" },
    { title: "Backpacks", id: "Backpacks" },
    { title: "Sleeping Bags", id: "Sleeping Bags" },
    { title: "Hiking Boots", id: "Hiking Boots" },
    { title: "Survival Gear", id: "Survival Gear" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-600 p-1 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 md:w-14" alt="Logo" />
          <Link to="/" className="text-lg md:text-xl font-bold">
            Campers Shop
          </Link>
        </div>

        {/* Nav Links - Desktop */}
        <ul className="hidden lg:flex items-center space-x-3 md:space-x-5 lg:space-x-7">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={name} className="relative group">
                <NavLink
                  to={path}
                  className={`p-1 rounded transition duration-200 ${
                    isActive
                      ? "bg-[#833d47] text-white"
                      : "hover:bg-[#833d47] hover:text-white"
                  }`}
                >
                  {name}
                </NavLink>

                {/* Mega menu for Shop */}
                {name === "Shop" && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black py-3 px-6 rounded shadow-lg w-72 z-50">
                    <ul className="space-y-2">
                      {megaMenuItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/shop?category=${item.id}`}
                            className="hover:text-[#833d47] block"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-300 hover:bg-[#833d47]"
          >
            <span className="absolute -top-2 -right-2 bg-[#833d47] text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length || 0}
            </span>
            <ShoppingCart size={22} className="text-white" />
          </Link>

          {/* Profile Dropdown */}
          <div className="hidden md:flex relative" ref={dropdownRef}>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-[#3b4927] hover:bg-[#2d3820] rounded-lg transition"
                >
                  <UserCircle size={20} />
                  <ChevronDown size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-md z-50">
                    <Link
                      to="/user/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 rounded-3xl hover:bg-gray-300"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded-3xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-1 bg-[#833d47] hover:bg-[#3b4927] text-white rounded transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-[#692f38] text-white py-3">
          <ul className="flex flex-col items-center space-y-4">
            {navItems.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={`block px-4 py-2 rounded transition duration-200 ${
                      isActive ? "bg-green-600" : "hover:bg-green-600"
                    }`}
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
            {user ? (
              <>
                <li>
                  <Link
                    to="/user/dashboard/profile"
                    className="block px-4 py-2 hover:bg-green-600"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(logout())}
                    className="block w-full px-4 py-2 hover:bg-green-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-green-600"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
