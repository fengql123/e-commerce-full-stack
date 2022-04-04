/* eslint-disable react-hooks/exhaustive-deps */
import "./Order.css";
import React, { useEffect } from "react";
import TopBar from "../TopBar/TopBar";
import {
  selectOrders,
  isLoadingOrders,
  isErrorOrders,
  fetchOrders,
} from "../../features/Orders/OrdersSlice";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(isLoadingOrders);
  const isError = useSelector(isErrorOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (isLoading) {
    return <h1>loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="order">
      <TopBar />
      <div className="order-container">
        <div className="cart-container-head">
          <p>Product</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        {orders.map((order, i) => {
          return <CartItem items={order.Products[0]} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Order;
