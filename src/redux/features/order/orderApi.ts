import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: (info) => ({
        url: "orders",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["orders"],
    }),

    getAllOrderItems: builder.query({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    getUserOrder: builder.query({
      query: (email: string) => {
        if (!email) throw new Error("Email is required to fetch the Order");
        return {
          url: `orders/${email}`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
      transformResponse: (response) => {
        if (!response) throw new Error("Order data not found");
        return response;
      },
    }),

    deleteOrder: builder.mutation({
      query: (id: string) => {
        return {
          url: `orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        return {
          url: `order/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrdersMutation,
  useGetAllOrderItemsQuery,
  useGetUserOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
