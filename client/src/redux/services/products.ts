import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product } from "../../interfaces/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({ query: () => "/" }),
    getProduct: builder.query<Product, any>({ query: (id) => `/${id}` }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
