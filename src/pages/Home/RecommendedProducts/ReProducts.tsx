import { Link } from "react-router-dom";
import { useState } from "react";

// Sample Data (Replace with API call)
const sampleProducts = [
  {
    id: 1,
    name: "Camping Tent",
    price: "$120",
    img: "https://media.gettyimages.com/id/142533334/photo/yellow-dome-tent-with-open-zip-enclosure.jpg?s=612x612&w=gi&k=20&c=DppLRA2cr7SKvArCFx_9wKXqSPBZWKflFz2KlhUipLA=",
  },
  {
    id: 2,
    name: "Backpacking Stove",
    price: "$45",
    img: "https://cdn.shopify.com/s/files/1/0589/1512/7436/products/KoveaExpedition_900x.jpg?v=1650601086",
  },
  {
    id: 3,
    name: "Sleeping Bag",
    price: "$85",
    img: "https://rukminim2.flixcart.com/image/850/1000/ku04o7k0/sleeping-bag/h/m/e/190-190-cm-x-80-cm-best-quality-sleeping-bags-in-rectangular-original-imag782gm6abrcp2.jpeg?q=90&crop=false",
  },
  {
    id: 4,
    name: "Hiking Backpack",
    price: "$99",
    img: "https://media.istockphoto.com/id/840113534/photo/backpacks-in-the-mountains-overlooking-the-mountains-on-the-green-grass.jpg?s=612x612&w=0&k=20&c=SWxOHCHorlqRO2EC--drexExy4UpEbYIX7U_6Vn_AdA=",
  },
];

const ReProducts = () => {
  const [products, ] = useState(sampleProducts);



  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#833d47]">
        Best Selling & Recommended
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-300"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-[#90c63e] font-bold">{product.price}</p>
            <Link
              to={`/shop/${product.id}`}
              className="block text-center bg-[#90c63e] hover:bg-[#833d47] text-white py-2 mt-3 rounded transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/shop"
          className="bg-[#833d47] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#6b2d38] transition"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};

export default ReProducts;
