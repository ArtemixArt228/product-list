import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "./services/products";
import { commentsApi } from "./services/comments";
import modalReducer from "./modal/modalSlice";
import productReducer from "./product/productSlice";
import dropdownReducer from "./dropdown/dropdownSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    modal: modalReducer,
    product: productReducer,
    dropdown: dropdownReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      commentsApi.middleware
    ),
});
