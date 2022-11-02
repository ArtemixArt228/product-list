import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "./services/products";
import { commentsApi } from "./services/comments";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
