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
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";

const Shop = () => {
  const { data } = useGetAllProductsQuery(undefined);
  const products = useMemo(() => data?.data || [], [data]); // Fix API response access

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
        category !== "all" ? product.category._id === category : true
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
        <div>
          <label className="block text-sm font-semibold mb-1">Price Range</label>
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
            {products
              .map((p) => p.category)
              .filter(
                (v, i, self) => self.findIndex((c) => c._id === v._id) === i
              ) // Remove duplicate categories
              .map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
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
              key={product._id}
              className="p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <CardContent>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600">${product.price}</p>
                <Link
                  to={`/product/${product._id}`}
                  className="block mt-2 text-center bg-[#833d47] text-white py-2 rounded-lg hover:bg-[#90c63e] transition-colors"
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
