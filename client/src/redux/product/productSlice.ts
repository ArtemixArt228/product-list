import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../interfaces/product";

const initialState: { products: Product[] } = { products: [] };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      console.log(action.payload);
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>): any {
      state.products = [...state.products, action.payload];
    },
    deleteById(state, action: PayloadAction<string>): any {
      return state.products.filter(
        (product: Product) => product._id !== action.payload
      );
    },
    updateProduct(state, action: PayloadAction<Product>): any {
      return state.products.map((product: Product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
  },
});

export const { addProduct, deleteById, updateProduct, setProducts } =
  productSlice.actions;
export default productSlice.reducer;
export const getProductsSelector = (store: any) => store.products;
