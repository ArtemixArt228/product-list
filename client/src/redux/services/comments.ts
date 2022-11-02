import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/comments",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], any>({
      query: (id) => `/${id}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/",
        method: "POST",
        body: comment,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
