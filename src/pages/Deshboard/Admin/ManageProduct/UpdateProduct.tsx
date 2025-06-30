/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import { useParams } from "react-router-dom";

import { useGetAllCategoriesItemsQuery } from "@/redux/features/categories/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/products";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetSingleProductQuery(productId ?? "");
  const [updateToProduct] = useUpdateProductMutation();
  const { data: categoryData } = useGetAllCategoriesItemsQuery("");
  const { register, handleSubmit, reset } = useForm<TProduct>();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const imgbbKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const currentProductItem = productData?.data;

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFiles(files);
    setPreviewImages(previews);
  };

  const onSubmit = async (data: TProduct) => {
    if (!currentProductItem || !productId) return;

    try {
      let uploadedImages: string[] = [];

      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
            formData
          );
        });

        const responses = await Promise.all(uploadPromises);
        uploadedImages = responses.map(
          (res) => (res.data as { data: { url: string } }).data.url
        );
      } else {
        uploadedImages = currentProductItem.image || [];
      }

      const finalData = {
        ...data,
        image: uploadedImages,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await updateToProduct({ id: productId, data: finalData }).unwrap();
      toast.success("Product updated successfully!");
      reset({
        ...finalData,
        image: Array.isArray(finalData.image) ? finalData.image[0] || "" : finalData.image,
      });
      setPreviewImages([]);
      setImageFiles([]);
      

    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) return <p className="text-center">Loading product...</p>;
  if (isError || !currentProductItem)
    return <p className="text-center text-red-500">Failed to load product.</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Update Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          {...register("name", { required: true })}
          defaultValue={currentProductItem.name}
          className="w-full border px-4 py-2 rounded-md"
          type="text"
          placeholder="Name"
        />

        <textarea
          {...register("description", { required: true })}
          defaultValue={currentProductItem.description}
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Description"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("price", { required: true })}
            defaultValue={currentProductItem.price}
            type="number"
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Price"
          />
          <input
            {...register("stock", { required: true })}
            defaultValue={currentProductItem.stock}
            type="number"
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Stock"
          />
        </div>

        <select
          {...register("category", { required: true })}
          defaultValue={currentProductItem.category}
          className="w-full border px-4 py-2 rounded-md"
        >
          <option value="">Select Category</option>
          {categoryData?.data?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          {...register("productType")}
          defaultValue={currentProductItem.productType}
          className="w-full border px-4 py-2 rounded-md"
        >
          <option value="regular">Regular</option>
          <option value="bestSelling">Best Selling</option>
          <option value="featured">Featured</option>
        </select>

        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Upload Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagePreview}
            className="w-full"
          />
          <div className="flex gap-4 mt-3 flex-wrap">
            {previewImages.length > 0
              ? previewImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))
              : currentProductItem.image?.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Old"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-[#7ab134] text-white font-semibold py-2 rounded-md"
        >
          Update Product
        </Button>
      </form>
    </motion.div>
  );
};

export default UpdateProduct;
