import { useDeleteProductMutation, useGetAllProductsQuery,  } from "@/redux/features/products/productsApi";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { TProduct } from "@/types/products";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    console.log(id)
    await deleteProduct(id);
    setDeletingId(null);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Manage Products</h2>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to load products.</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#90c63e] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product: TProduct) => (
              <tr key={product._id} className="border-t hover:bg-gray-100 transition">
                <td className="py-3 px-6">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6">{product.stock}</td>
                <td className="py-3 px-6">{product.category?.name || "N/A"}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <Link to={  `/admin/dashboard/update/${product._id}`}>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
                    <FaEdit />
                  </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                  >
                    {deletingId === product._id ? "Deleting..." : <FaTrash />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageProduct;
