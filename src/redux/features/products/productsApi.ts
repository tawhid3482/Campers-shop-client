import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
        // body: userInfo,
      }),
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        console.log("Fetching product with id:", id);
        return {
          url: `products/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery,useGetSingleProductQuery } = productsApi;
