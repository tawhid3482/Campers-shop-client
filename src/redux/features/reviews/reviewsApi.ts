import { baseApi } from "../../api/baseApi";

const ReviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReviews: builder.mutation({
      query: (info) => ({
        url: "reviews",
        method: "POST",
        body: info,
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "reviews",
        method: "GET",
      }),
    }),

    getSingleReviews: builder.query({
      query: (id) => {
        console.log("Fetching product with id:", id);
        return {
          url: `reviews/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddReviewsMutation,useGetAllReviewsQuery,useGetSingleReviewsQuery } = ReviewsApi;
