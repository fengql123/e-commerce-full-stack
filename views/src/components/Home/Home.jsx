import "./Home.css";
import React from "react";
import TopBar from "../TopBar/TopBar";
import Products from "../Products/Products";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <Products />
    </div>
  );
};

export default Home;
