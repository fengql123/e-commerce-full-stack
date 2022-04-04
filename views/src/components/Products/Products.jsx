/* eslint-disable react-hooks/exhaustive-deps */
import "./Products.css";
import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  fetchProducts,
} from "../../features/Products/ProductsSlice";

const Products = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="products">
      <div className="card-deck">
        {products.map((product, i) => {
          return <Product product={product} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Products;
