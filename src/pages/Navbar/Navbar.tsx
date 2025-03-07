import { useState } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.gif";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#90c63e]  p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2">
          <img src={logo} className="w-10 md:w-16 bg-[90c63e]" alt="" />
          <Link to="/" className="text-sm md:text-2xl font-bold">
            Campers Shop
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:items-center md:justify-center md:space-x-6">
          <li>
            <Link
              to="/"
              className="px-4 py-2 hover:bg-[#833d47] hover:text-white rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="px-4 py-2 hover:bg-[#833d47] hover:text-white rounded"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 hover:bg-[#833d47] hover:text-white rounded"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 hover:bg-[#833d47] hover:text-white rounded"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/wishlist"
            className="hover:bg-[#833d47] hover:text-white p-1 rounded-lg"
          >
            <Heart size={24} />
          </Link>
          <Link
            to="/cart"
            className="hover:bg-[#833d47] hover:text-white p-1 rounded-lg"
          >
            <ShoppingCart size={24} />
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="">
            <Link
              to="/login"
              className="px-4 py-2  bg-[#833d47] hover:bg-[#3b4927] text-white rounded"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#692f38]  text-white py-2 my-2">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="block px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-[#90c63e] rounded"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
