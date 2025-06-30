import {
  TentTree,
  Compass,
  Droplet,
  CloudSun,
  Leaf,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const servicesDetails = [
  {
    title: "Comprehensive Camping Gear",
    icon: <TentTree className="w-8 h-8 text-green-600" />,
    description:
      "We provide a wide variety of camping equipment including tents, sleeping bags, backpacks, cooking tools, and more. All products are high quality and eco-friendly.",
  },
  {
    title: "Expert Guidance & Tips",
    icon: <Compass className="w-8 h-8 text-green-600" />,
    description:
      "Our team shares useful camping tips and personalized advice to help you plan your trips.",
  },
  {
    title: "Fast & Secure Shipping",
    icon: <Droplet className="w-8 h-8 text-green-600" />,
    description:
      "Reliable shipping ensures timely delivery of your orders safely to your door.",
  },
  {
    title: "30-Day Hassle-Free Return Policy",
    icon: <CloudSun className="w-8 h-8 text-green-600" />,
    description:
      "Return or exchange items within 30 days of delivery. Our support will guide you through a smooth process.",
  },
  {
    title: "Dedicated Customer Support",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    description:
      "Our support team is available 24/7 to assist you with orders or camping advice.",
  },
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate camper and outdoor enthusiast, Sarah leads our team with vision and dedication.",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Michael Lee",
    role: "Product Specialist",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    bio: "Expert in camping gear and technology, Michael ensures we offer only the best products.",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Emily Davis",
    role: "Customer Support",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Emily loves helping our customers and making their camping experience seamless.",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "James Smith",
    role: "Logistics Manager",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "James handles our fast and reliable shipping with great attention to detail.",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];

const Services = () => {
  return (
    <main className="bg-white px-6 md:px-20 py-20">
      {/* Services Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <h1 className="text-5xl font-extrabold text-[#833d47] mb-12 text-center">
          Our Services & Policies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {servicesDetails.map((service, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-6 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition cursor-default"
            >
              <div className="flex-shrink-0 bg-green-600 rounded-full p-3 flex items-center justify-center">
                {service.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#833d47] mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#833d47] mb-16 text-center">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center cursor-default"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-green-600 shadow-sm"
              />
              <h3 className="text-2xl font-semibold text-green-600 mb-1">{member.name}</h3>
              <p className="text-[#833d47] font-medium mb-4">{member.role}</p>
              <p className="text-gray-700 max-w-xl">{member.bio}</p>

              {/* Social Icons */}
              <div className="flex space-x-6 mt-6">
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-green-600 hover:text-[#833d47] transition"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-green-600 hover:text-[#833d47] transition"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-green-600 hover:text-[#833d47] transition"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Services;
