import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/Profile/ProfileSlice";
import productsReducer from "../features/Products/ProductsSlice";
import cartReducer from "../features/Cart/CartSlice";
import ordersReducer from "../features/Orders/OrdersSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
