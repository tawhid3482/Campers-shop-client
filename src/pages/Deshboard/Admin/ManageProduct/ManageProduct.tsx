/* eslint-disable react-hooks/exhaustive-deps */
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { TProduct } from "@/types/products";
import { Link } from "react-router-dom";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const ManageProduct = () => {
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({});
  const products: TProduct[] = data?.data || [];

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteProduct(id);
    setDeletingId(null);
    refetch();
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 sm:p-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 text-center">
        Manage Products
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 px-2 sm:px-0">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-3 pl-12 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
              transition text-sm sm:text-base"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
        </div>
      </div>

      {/* Loading and Error */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to load products.</p>}

      {/* Table wrapper for horizontal scroll on small devices */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">Image</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">Name</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">Price</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">Stock</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">Category</th>
              <th className="py-3 px-4 text-center text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 text-sm sm:text-base">
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product: TProduct) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">
                    {Array.isArray(product.image) ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 font-medium text-sm sm:text-base">{product.name}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">{product.stock}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">{product.category?.name || "N/A"}</td>
                  <td className="py-2 px-4 text-center space-x-1 sm:space-x-2">
                    <Link to={`/admin/dashboard/update/${product._id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow"
                    >
                      {deletingId === product._id ? "Deleting..." : <FaTrash />}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1 sm:space-x-3 flex-wrap">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm px-3 py-1 rounded"
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${
              page === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-green-400"
            } rounded px-3 py-1 text-xs sm:text-sm shadow`}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm px-3 py-1 rounded"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default ManageProduct;
