import "./Product.css";
import React, { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const Product = ({ product }) => {
  const { id, name, price, stock, image, image_type } = product;
  const [productQt, setProductQt] = useState(0);
  const [showAddQt, setShowAddQt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [failedAdd, setFailedAdd] = useState(false);
  const imgUrl = new Buffer.from(image.data).toString("base64");
  const addToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/product/${id}/addToCart`,
        { productQt: productQt }
      );
      if (response.status === 200) {
        setShowSuccess(true);
      }
    } catch (err) {
      setFailedAdd(true);
    }
  };

  return (
    <div className="card" style={{ width: "200px" }}>
      <img
        class="img-thumbnail"
        src={`data:image/${image_type};base64, ${imgUrl}`}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p>${price}</p>

        {showAddQt ? (
          <>
            <input
              type="number"
              value={productQt}
              className="form-control"
              min="0"
              max={stock}
              onChange={(e) => {
                setProductQt(e.target.value);
              }}
              style={{ marginBottom: "16px" }}
            />
            <div className="add-and-close">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  addToCart();
                  setShowAddQt(false);
                }}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="close"
                aria-label="Close"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  setShowAddQt(false);
                  setShowSuccess(false);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setShowAddQt(true);
                setShowSuccess(false);
              }}
            >
              Add To Cart
            </button>
            {showSuccess ? (
              <p style={{ marginTop: "16px" }}>Successfully added to cart!</p>
            ) : null}
            {failedAdd ? (
              <div style={{ display: "flex" }}>
                <p style={{ marginTop: "16px" }}>failed to add to cart!</p>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: "20px",
                  }}
                  onClick={() => setFailedAdd(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div class="card-footer">
        <small class="text-muted">stock left : {stock}</small>
      </div>
    </div>
  );
};

export default Product;
