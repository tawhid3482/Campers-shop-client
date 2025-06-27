import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-r from-[#90c63e] to-[#a07178] text-white">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/campfire-with-mountain-background-campfire-background_1301236-61867.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <motion.div
        className="relative text-center px-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Adventure Starts Here
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Explore premium camping gear for your next journey.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link to="/shop">
            <button className="px-6 py-3 bg-[#90c63e] hover:bg-[#833d47] text-white font-semibold rounded-lg shadow-md transition">
              Shop Now
            </button>
          </Link>
          <Link to="/about">
            <button className="px-6 py-3 border border-white hover:bg-white hover:text-[#a07178] text-white font-semibold rounded-lg transition">
              Explore More
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
