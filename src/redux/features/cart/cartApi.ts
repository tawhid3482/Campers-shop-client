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

    getUserCart: builder.query({
      query: (email: string) => {
        if (!email) throw new Error("Email is required to fetch the cart");
        return {
          url: `cart/${email}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        if (!response) throw new Error("Cart data not found");
        return response;
      },
    }),
  }),
});

export const { 
  useAddToCartMutation, 
  useGetAllCartItemsQuery, 
  useGetUserCartQuery 
} = cartApi;
