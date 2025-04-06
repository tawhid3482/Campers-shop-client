import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["products"],
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery,useGetSingleProductQuery } = productsApi;
