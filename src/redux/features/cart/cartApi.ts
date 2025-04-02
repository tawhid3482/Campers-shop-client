import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (info) => ({
        url: "cart",
        method: "POST",
        body: info,
      }),
    }),
    getAllCartItems: builder.query({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
    }),
  }),
});


export const { useAddToCartMutation, useGetAllCartItemsQuery } = cartApi;