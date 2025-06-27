import { motion } from "framer-motion";
import { TentTree, Compass, Droplet, CloudSun, Leaf } from "lucide-react";

const tipsData = [
  {
    step: "Step 1",
    icon: <TentTree className="text-[#90c63e] w-10 h-10" />,
    title: "Choose Your Tent Wisely",
    description: "Start by selecting a tent that fits the season, location, and group size.",
  },
  {
    step: "Step 2",
    icon: <Compass className="text-[#90c63e] w-10 h-10" />,
    title: "Plan Your Gear & Route",
    description: "Prepare your essentials: backpack, compass, and route plan.",
  },
  {
    step: "Step 3",
    icon: <Droplet className="text-[#90c63e] w-10 h-10" />,
    title: "Stock Food & Water",
    description: "Pack easy-to-cook meals and plenty of water for hydration.",
  },
  {
    step: "Step 4",
    icon: <CloudSun className="text-[#90c63e] w-10 h-10" />,
    title: "Check the Weather",
    description: "Weather awareness helps prevent uncomfortable or dangerous trips.",
  },
  {
    step: "Step 5",
    icon: <Leaf className="text-[#90c63e] w-10 h-10" />,
    title: "Leave No Trace",
    description: "Respect nature, clean your campsite, and follow eco-friendly rules.",
  },
];

const Tips = () => {
  // Group tipsData into pairs of two
  const pairs = [];
  for (let i = 0; i < tipsData.length; i += 2) {
    pairs.push(tipsData.slice(i, i + 2));
  }

  return (
    <section className="bg-[#f9f9f9] py-20 px-6 md:px-20">
      <motion.h2
        className="text-4xl font-bold text-center text-[#833d47] mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          Camping Tips & Tricks
      </motion.h2>

      <div className="flex flex-col gap-12">
        {pairs.map((pair, pairIndex) => (
          <div
            key={pairIndex}
            className="flex flex-col sm:flex-row items-stretch gap-6 relative"
          >
            {/* Card 1 */}
            <motion.div
              className="flex-1 relative group bg-white p-8 rounded-3xl shadow-xl border-l-4 border-[#90c63e] overflow-hidden hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: pairIndex * 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Horizontal line */}
              <span className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-[#90c63e] transition-all duration-500 ease-in-out" />
              {/* Vertical line */}
              <span className="absolute top-0 left-0 h-0 group-hover:h-full w-[3px] bg-[#90c63e] transition-all duration-500 ease-in-out delay-100" />

              <div className="mb-3 text-sm font-semibold text-[#833d47] uppercase tracking-wider">
                {pair[0].step}
              </div>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">{pair[0].icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#90c63e] mb-2">
                    {pair[0].title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {pair[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vertical line between cards - only if pair has 2 cards */}
            {pair.length === 2 && (
              <div className="hidden sm:block w-[3px] bg-[#90c63e] opacity-50 rounded-full mx-4" />
            )}

            {/* Card 2 if exists */}
            {pair.length === 2 && (
              <motion.div
                className="flex-1 relative group bg-white p-8 rounded-3xl shadow-xl border-l-4 border-[#90c63e] overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: pairIndex * 0.3 + 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Horizontal line */}
                <span className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-[#90c63e] transition-all duration-500 ease-in-out" />
                {/* Vertical line */}
                <span className="absolute top-0 left-0 h-0 group-hover:h-full w-[3px] bg-[#90c63e] transition-all duration-500 ease-in-out delay-100" />

                <div className="mb-3 text-sm font-semibold text-[#833d47] uppercase tracking-wider">
                  {pair[1].step}
                </div>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">{pair[1].icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#90c63e] mb-2">
                      {pair[1].title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {pair[1].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tips;
