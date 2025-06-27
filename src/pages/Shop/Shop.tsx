import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { TProduct } from "@/types/products";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category") || "all";

  const { data } = useGetAllProductsQuery(undefined);
  const products: TProduct[] = useMemo(() => data?.data || [], [data]);
  console.log("Products:", products);

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product: TProduct) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product: TProduct) =>
        category !== "all" ? product.category?.name === category : true
      )
      .filter(
        (product: TProduct) =>
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
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black p-3 rounded-md shadow-sm focus:ring focus:ring-gray-400"
        />

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

        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="border border-black p-3 rounded-md shadow-sm w-full lg:w-44">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {products
              .map((p) => p.category)
              .filter(
                (c, i, self) =>
                  c?.name && self.findIndex((v) => v?.name === c?.name) === i
              )
              .map((c) => (
                <SelectItem key={c?.name} value={c?.name || ""}>
                  {c?.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="border border-black p-3 rounded-md shadow-sm w-full lg:w-44">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

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

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: TProduct) => (
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
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <Link
                  to={`/products/${product._id}`}
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
