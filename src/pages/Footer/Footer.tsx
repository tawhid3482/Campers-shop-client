import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import logo from '../../assets/images/logo.gif'

const Footer = () => {
  return (
    <footer className="bg-green-600 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <img src={logo} className='w-44' alt="" />
            <h3 className="text-xl font-bold mb-4">Campers-shop</h3>
            <p className="text-sm">
              Discover the best camping gear and enjoy outdoor adventures with Camper Shop!
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/shop" className="hover:text-gray-300">Shop</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-sm">We can provide you 24 hours service</p>
            <p className="text-sm">Email: support@campershop.com</p>
            <p className="text-sm">Phone: +123 456 789</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-4xl text-blue-600"><FaFacebookSquare /></Link>
              <Link to="#" className="text-4xl text-[#FE2376]"><FaInstagramSquare></FaInstagramSquare></Link>
              <Link to="#" className="text-4xl text-blue-600"><FaTwitter></FaTwitter></Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Text */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 Camper Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
