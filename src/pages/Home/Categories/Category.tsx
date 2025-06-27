import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Tents",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJlJIMXiTczxW0O8_CTVbnhVnEnFE27dmxFTx_9ykdnIIssB6FZL180UJ_tVIwryOw1-0&usqp=CAU",
  },
  {
    id: 2,
    name: "Sleeping Bags",
    image: "https://media.istockphoto.com/id/1327083251/photo/a-young-woman-in-a-comfortable-sleeping-bag-in-a-tent-top-view-a-tourist-in-a-sleeping-bag-a.jpg?s=612x612&w=0&k=20&c=-g_cFxitsdoljVqyFqJXO09L7qVISU5q9mS91YFx0E4=",
  },
  {
    id: 3,
    name: "Survival Gear",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7cva-VgJtH2tVSfKjPKwxynL1FWJKpJqsQ&s",
  },
  {
    id: 4,
    name: "Hiking Boots",
    image: "https://media.istockphoto.com/id/1180121132/photo/top-view-camping-and-hiking-travel-and-hiking-gear-equipment-and-accessories-for-mountain.jpg?s=612x612&w=0&k=20&c=9m8mb5RlWEyHxaA3VXrMOxtivu3_Xzdh7bx0om70sTQ=",
  },
  {
    id: 5,
    name: "Lighting & Power",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnStT6xQ7flIWF5Cd3Y3565Jn2aa7OLeEzCw&s",
  },
  {
    id: 6,
    name: "Outdoor Clothing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2XcDTZVK4QQmDNOTy-jZjvWKBYWdqOxRKuA&s",
  },
];

const Category = () => {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B2D38] mb-6">Explore Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.name}`}
              className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <h3 className="text-[#90c63e] text-xl font-semibold group-hover:text-yellow-400 transition">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
