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
  }),
});

export const {useGetAllProductsQuery} = productsApi;
