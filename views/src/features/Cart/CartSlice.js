import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCartAPI } from "../../utils/api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetchCartAPI();
  return response;
});

const initialState = {
  cart: [],
  isLoading: true,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const isLoadingCart = (state) => state.cart.isLoading;
export const isErrorCart = (state) => state.cart.error;

export default cartSlice.reducer;
