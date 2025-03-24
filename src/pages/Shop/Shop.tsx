import { useState } from "react";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "Camping Tent",
      price: 120,
      img: "https://media.gettyimages.com/id/142533334/photo/yellow-dome-tent-with-open-zip-enclosure.jpg?s=612x612&w=gi&k=20&c=DppLRA2cr7SKvArCFx_9wKXqSPBZWKflFz2KlhUipLA=",
      category: "tours",
    },
    {
      id: 2,
      name: "Backpacking Stove",
      price: 45,
      img: "https://cdn.shopify.com/s/files/1/0589/1512/7436/products/KoveaExpedition_900x.jpg?v=1650601086",
      category: "tours",
    },
    {
      id: 3,
      name: "Sleeping Bag",
      price: 85,
      img: "https://rukminim2.flixcart.com/image/850/1000/ku04o7k0/sleeping-bag/h/m/e/190-190-cm-x-80-cm-best-quality-sleeping-bags-in-rectangular-original-imag782gm6abrcp2.jpeg?q=90&crop=false",
      category: "tours",
    },
    {
      id: 4,
      name: "Hiking Backpack",
      price: 99,
      img: "https://media.istockphoto.com/id/840113534/photo/backpacks-in-the-mountains-overlooking-the-mountains-on-the-green-grass.jpg?s=612x612&w=0&k=20&c=SWxOHCHorlqRO2EC--drexExy4UpEbYIX7U_6Vn_AdA=",
      category: "tours",
    },
  ];

  // const { data: products } = useGetAllProductsQuery(undefined);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");

  // Filtered products based on search, category, and price range
  const filteredProducts = products
    ?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true))
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : sortOrder === "desc"
        ? b.price - a.price
        : 0
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search Bar */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        {/* Category Filter */}
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4"
        >
          <SelectItem value="">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="outdoor">Outdoor</SelectItem>
        </Select>

        {/* Price Range Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-semibold">Price Range</label>
          <Slider
            min={0}
            max={1000}
            value={priceRange}
            onChange={setPriceRange}
          />
          <p className="text-sm text-gray-500">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>

        {/* Sorting */}
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/4"
        >
          <SelectItem value="">Sort by</SelectItem>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </Select>

        {/* Clear Filters */}
        <Button
          onClick={() => {
            setSearch("");
            setCategory("");
            setSortOrder("");
            setPriceRange([0, 1000]);
          }}
          className="w-full md:w-auto"
        >
          Clear Filters
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <Card key={product.id} className="p-4 bg-white shadow-lg rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <CardContent>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="block mt-2 text-center bg-[#833d47] text-white py-2 rounded-lg hover:bg-[#692f38]"
              >
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
