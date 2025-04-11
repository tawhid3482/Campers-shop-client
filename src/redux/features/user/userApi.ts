import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "users",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUser: builder.query({
      query: (email: string) => ({
        url: `users/${email}`,
        method: "GET",
      }),
    }),
    getAdminStats: builder.query({
      query: () => ({
        url: "admin-stats",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery, useGetAdminStatsQuery } =
  userApi;
