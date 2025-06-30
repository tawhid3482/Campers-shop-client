import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToProduct: builder.mutation({
      query: (info) => ({
        url: "products",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["products"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id:string) => {
        return {
          url: `products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `products/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddToProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productsApi;
