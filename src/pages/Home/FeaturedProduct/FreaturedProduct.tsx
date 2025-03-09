import { Link } from "react-router-dom";

const featuredProducts = [
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

const FeaturedProducts = () => {
  return (
    <section className="py-10  ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B2D38] mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">${Number(product.price.replace('$', '')).toFixed(2)}</p>

              <Link
                to={`/product/${product.id}`}
                className="block mt-3 text-center bg-[#90c63e] text-white  py-2 px-4 rounded-lg hover:bg-[#833d47] transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="bg-[#833d47] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
