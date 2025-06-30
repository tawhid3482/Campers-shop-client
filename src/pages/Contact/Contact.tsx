import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-[#833d47] mb-6">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">Get in Touch</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Your Email" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" rows={4} placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-[#833d47] text-white py-2 rounded-lg transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[#833d47] mb-4">Our Contact Details</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="text-green-600" />
              <p className="text-gray-700">123 Camper Street, Adventure City</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-green-600" />
              <p className="text-gray-700">+1 (234) 567-890</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-green-600" />
              <p className="text-gray-700">support@campershop.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
