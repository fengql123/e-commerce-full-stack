import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrdersAPI } from "../../utils/api";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetchOrdersAPI();
  return response;
});

const initialState = {
  orders: [],
  isLoading: true,
  error: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const isLoadingOrders = (state) => state.orders.isLoading;
export const isErrorOrders = (state) => state.orders.error;

export default ordersSlice.reducer;
