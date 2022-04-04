import "./App.css";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ProfileCheckout from "./components/ProfileCheckout/ProfileCheckout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import AddProduct from "./components/AddProduct/AddProduct";
import React from "react";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<TopBar />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="products/:productId" element={<Product />} />
        <Route path="products" element={<Products />}></Route>
        <Route path="orderInfo" element={<Order />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="/profile/addProduct" element={<AddProduct />} />
        <Route path="/profile/checkoutInfo" element={<ProfileCheckout />} />
        <Route path="profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
};

export default App;
