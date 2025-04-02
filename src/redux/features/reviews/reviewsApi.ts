import { baseApi } from "../../api/baseApi";

const ReviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReviews: builder.mutation({
      query: (info) => ({
        url: "reviews",
        method: "POST",
        body: info, // Ensure you send the `info` in the body for the POST request
      }),
      invalidatesTags: [{ type: "Reviews" }], // Invalidate the cache for reviews after adding a new review
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"], // Provide a tag for the reviews query to cache it
    }),
    getSingleReviews: builder.query({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddReviewsMutation, useGetAllReviewsQuery, useGetSingleReviewsQuery } = ReviewsApi;
