import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/comments",
  }),
  endpoints: (builder) => ({
    getComments: builder.query<[], void>({ query: () => "/" }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/",
        method: "POST",
        body: comment,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
