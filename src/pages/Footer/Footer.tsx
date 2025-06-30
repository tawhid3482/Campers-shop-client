import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import logo from "../../assets/images/logo.gif";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About */}
          <div>
            <img src={logo} className="w-28 mb-2" alt="Logo" />
            <h3 className="text-lg font-bold text-white mb-1">Campers-Shop</h3>
            <p className="text-xs text-gray-100 leading-snug">
              Discover the best camping gear and enjoy outdoor adventures with Camper Shop!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
            <ul className="space-y-1 text-sm text-gray-100">
              <li>24/7 support available</li>
              <li>Email: support@campershop.com</li>
              <li>Phone: +123 456 789</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-3 text-2xl">
              <Link to="#" className="hover:text-blue-500"><FaFacebookSquare /></Link>
              <Link to="#" className="hover:text-pink-500"><FaInstagramSquare /></Link>
              <Link to="#" className="hover:text-sky-400"><FaTwitter /></Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-xs text-gray-200 border-t border-gray-200 pt-3">
          &copy; 2025 Camper Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
