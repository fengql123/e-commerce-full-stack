import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../../utils/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProductsAPI();
    return response;
  }
);

const initialState = {
  products: [],
  isLoading: true,
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const isLoadingProducts = (state) => state.products.isLoading;
export const isErrorProducts = (state) => state.products.isError;

export default productsSlice.reducer;
