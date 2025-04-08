import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayments: builder.mutation({
      query: (info) => ({
        url: "create-ssl-payment",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["payments"],
    }),

    getAllPaymentItems: builder.query({
      query: () => ({
        url: "payment",
        method: "GET",
      }),
      providesTags: ["payments"],
    }),

    getUserPayment: builder.query({
      query: (email: string) => {
        if (!email) throw new Error("Email is required to fetch the payment");
        return {
          url: `payment/${email}`,
          method: "GET",
        };
      },
      providesTags: ["payments"],
      transformResponse: (response) => {
        if (!response) throw new Error("payment data not found");
        return response;
      },
    }),

    deletePayment: builder.mutation({
      query: (id: string) => {
        return {
          url: `payment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["payments"],
    }),
    // updatePayment: builder.mutation({
    //   query: ({ id, data }) => {
    //     console.log(id, data);
    //     return {
    //       url: `payment/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["payments"],
    // }),
  }),
});

export const {
  useCreatePaymentsMutation,
  useGetAllPaymentItemsQuery,
  useGetUserPaymentQuery,
  useDeletePaymentMutation,
} = paymentApi;
