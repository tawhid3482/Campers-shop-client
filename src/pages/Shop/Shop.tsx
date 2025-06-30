/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Star, X, SlidersHorizontal } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products";
import SkeletonCard from "./ShopSkeleton";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category") || "all";

  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const products: TProduct[] = useMemo(() => data?.data || [], [data]);

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, priceRange, sortOrder]);

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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar (Desktop) */}
      <aside className="w-72 hidden md:block sticky top-0 h-screen overflow-y-auto bg-[#f9fafb] border-r border-gray-200 scrollbar-thin scrollbar-thumb-gray-300">
        <div className="p-4">
          <div className="bg-green-100 rounded-xl shadow border p-5 space-y-6">
            <h2 className="text-lg font-bold text-[#833d47]">Filters</h2>
            <SidebarContent
              search={search}
              setSearch={setSearch}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={() => {
                setSearch("");
                setCategory("all");
                setSortOrder("");
                setPriceRange([0, 500]);
              }}
              products={products}
            />
          </div>
        </div>
      </aside>

      {/* Sidebar (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed left-0 top-0 w-72 h-screen bg-white p-6 z-50 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#833d47]">Filters</h2>
              <X
                className="cursor-pointer text-gray-500 hover:text-[#833d47]"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
            <SidebarContent
              search={search}
              setSearch={setSearch}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={() => {
                setSearch("");
                setCategory("all");
                setSortOrder("");
                setPriceRange([0, 500]);
              }}
              products={products}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-[#833d47]">Shop</h2>
          <Button
            variant="outline"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-[#833d47] border-[#833d47]"
          >
            <SlidersHorizontal size={20} /> Filters
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedProducts.map((product: TProduct) => {
                const stars = Math.round(product.rating || 4.5);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl border hover:shadow-lg transition duration-300 "
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48  object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < stars ? "#facc15" : "none"}
                            stroke={i < stars ? "#facc15" : "#d1d5db"}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rating?.toFixed(1) || "4.5"})
                        </span>
                      </div>
                      <p className="text-[#833d47] font-bold text-sm">
                        ${product.price}
                      </p>
                      <Link
                        to={`/products/${product._id}`}
                        className="block text-center text-sm bg-[#833d47] hover:bg-[#6c8e1e] text-white py-1.5 rounded-md font-semibold transition"
                      >
                        View Details
                      </Link>
                    </CardContent>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium border transition ${
                    currentPage === page
                      ? "bg-[#833d47] text-white border-[#833d47]"
                      : "bg-white text-[#833d47] border-[#833d47] hover:bg-[#f3e5e7]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const SidebarContent = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  resetFilters,
  products,
}: any) => (
  <div className="space-y-5">
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">Search</label>
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">Price Range</label>
      <Slider
      className="text-green-500"
        min={0}
        max={500}
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as number[])}
      />
      <p className="text-sm mt-1 text-gray-500">${priceRange[0]} - ${priceRange[1]}</p>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {products
            .map((p: TProduct) => p.category)
            .filter(
              (c: any, i: any, self: any) =>
                c?.name && self.findIndex((v: any) => v?.name === c?.name) === i
            )
            .map((c: any) => (
              <SelectItem key={c?.name} value={c?.name || ""}>
                {c?.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">Sort By Price</label>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger>
          <SelectValue placeholder="Select Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Low to High</SelectItem>
          <SelectItem value="desc">High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button
      variant="outline"
      className="w-full text-[#833d47] border-[#833d47] hover:bg-[#833d47] hover:text-white"
      onClick={resetFilters}
    >
      Clear Filters
    </Button>
  </div>
);

export default Shop;
