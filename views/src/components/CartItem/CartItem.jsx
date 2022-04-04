import "./CartItem.css";
import { Buffer } from "buffer";
import React from "react";

const CartItem = ({ items }) => {
  const image = items.image;
  const id = items.id;
  const price = items.price;
  const name = items.name;
  const quantity = items.Cart_Product
    ? items.Cart_Product.product_qt
    : items.Product_Order.product_qt;
  const total = quantity * price;
  const image_type = items.image_type;
  const imgUrl = new Buffer.from(image.data).toString("base64");
  return (
    <div className="cartItem">
      <div className="product-name-pic">
        <img
          class="img-thumbnail"
          src={`data:image/${image_type};base64, ${imgUrl}`}
          alt=""
        />
        <p style={{ marginTop: "16px" }}>{name}</p>
      </div>
      <p style={{ marginRight: "6.5%" }}>${price}</p>
      <p style={{ marginRight: "6.5%" }}>{quantity}</p>
      <p style={{ marginRight: "3.5%" }}>${total}</p>
    </div>
  );
};

export default CartItem;
