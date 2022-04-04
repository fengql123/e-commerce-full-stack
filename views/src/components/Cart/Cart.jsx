/* eslint-disable react-hooks/exhaustive-deps */
import "./Cart.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import CartItem from "../CartItem/CartItem";
import {
  selectCart,
  isLoadingCart,
  isErrorCart,
  fetchCart,
} from "../../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(isLoadingCart);
  const isError = useSelector(isErrorCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkOut = async () => {
    try {
      const response = await axios.post("http://localhost:3001/cart/sendOrder");
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      alert("Fail to send order");
    }
  };
  let total = 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  if (isLoading) {
    return <h1>loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <div className="cart">
      <TopBar />
      <div className="cart-container">
        <div className="cart-container-head">
          <p>Product</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        {cart.map((item, i) => {
          total += item.price * item.Cart_Product.product_qt;
          return <CartItem items={item} key={i} />;
        })}
      </div>
      <div className="cart-footer">
        <h4 style={{ marginBottom: "0" }}>Total: ${total}</h4>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => checkOut()}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
