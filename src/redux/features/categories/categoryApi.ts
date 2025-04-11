import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (info) => ({
        url: "categories",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["category"],
    }),

    getAllCategoriesItems: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesItemsQuery
} = categoryApi;
