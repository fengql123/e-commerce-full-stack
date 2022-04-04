import "./AddProduct.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [file, setFile] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImg", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      "http://localhost:3001/product",
      formData,
      config
    );
    if (response.data.success) {
      navigate("/");
    } else {
      navigate("/profile/AddProduct");
    }
  };

  return (
    <div className="addProduct">
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            id="customFile"
            name="productImg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
