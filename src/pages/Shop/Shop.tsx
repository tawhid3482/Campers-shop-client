import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { Slider } from "@/Components/ui/slider";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const Shop = () => {
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Camping Tent",
        price: 120,
        img: "https://media.gettyimages.com/id/142533334/photo/yellow-dome-tent-with-open-zip-enclosure.jpg?s=612x612&w=gi&k=20&c=DppLRA2cr7SKvArCFx_9wKXqSPBZWKflFz2KlhUipLA=",
        category: "outdoor",
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
    ],
    []
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) =>
        category !== "all" ? product.category === category : true
      )
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
  }, [products, search, category, priceRange, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {/* Search Bar */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black p-3 rounded-md shadow-sm focus:ring focus:ring-gray-400 "
        />

        {/* Price Range Filter */}
        <div className="">
          <label className="block text-sm font-semibold mb-1">
            Price Range
          </label>
          <Slider
            min={0}
            max={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as number[])}
          />
          <p className="text-sm text-gray-500 mt-1">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>

        {/* Category Filter */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="border border-black p-3 rounded-md shadow-sm w-full lg:w-44">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="tours">Tours</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>

        {/* Sorting */}
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="border border-black p-3 rounded-md shadow-sm w-full lg:w-44">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setSortOrder("");
            setPriceRange([0, 1000]);
          }}
          className="w-full md:w-auto"
        >
          Clear Filters
        </Button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <CardContent>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600">${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="block mt-2 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
