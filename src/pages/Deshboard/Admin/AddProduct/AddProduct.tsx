/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { TProduct } from "@/types/products";
import { useAddToProductMutation } from "@/redux/features/products/productsApi";
import axios from "axios";
import { toast } from "sonner";
import { useGetAllCategoriesItemsQuery } from "@/redux/features/categories/categoryApi";

const AddProduct = () => {
  const [addToProduct] = useAddToProductMutation();
  const { data: categoryData } = useGetAllCategoriesItemsQuery("");
  console.log(categoryData)
  const { register, handleSubmit, reset } = useForm<TProduct>();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgbbKey =import.meta.env.VITE_IMAGE_HOSTING_KEY; 

  const onSubmit = async (data: TProduct) => {
    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );

        const responseData = res.data as { data: { url: string } };
        imageUrl = responseData.data.url;
      }

      const finalData = {
        ...data,
        image: imageUrl,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await addToProduct(finalData).unwrap();
      toast.success("Product added successfully");
      reset();
      setPreview(null);
      setImageFile(null);
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
            type="text"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Write product description"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="e.g. 19.99"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Stock
            </label>
            <input
              {...register("stock", { required: true, valueAsNumber: true })}
              type="number"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select a category</option>
            {categoryData?.data?.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Type */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Product Type
          </label>
          <select
            {...register("productType")}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select type</option>
            <option value="regular">Regular</option>
            <option value="bestSelling">Best Selling</option>
            <option value="featured">Featured</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#90c63e] hover:bg-[#7ab134] text-white font-semibold py-2 rounded-md"
        >
          Add Product
        </Button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
