import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (info) => ({
        url: "cart",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["carts"],
    }),

    getAllCartItems: builder.query({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
      providesTags: ["carts"],
    }),

    getUserCart: builder.query({
      query: (email: string) => {
        if (!email) throw new Error("Email is required to fetch the cart");
        return {
          url: `cart/${email}`,
          method: "GET",
        };
      },
      providesTags: ["carts"],
      transformResponse: (response) => {
        if (!response) throw new Error("Cart data not found");
        return response;
      },
    }),

    deleteCart: builder.mutation({
      query: (id: string) => {
        return {
          url: `cart/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["carts"],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => {
        // console.log(id, data);
        return {
          url: `cart/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllCartItemsQuery,
  useGetUserCartQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartApi;
