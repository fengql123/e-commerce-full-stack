import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [file, setFile] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("payment", payment);
    formData.append("isSeller", checked);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      "http://localhost:3001/create",
      formData,
      config
    );
    if (response.data.success) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
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
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id="isSeller"
            name="isSeller"
            className="custom-control-input"
            value={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label className="custom-control-label" for="isSeller">
            Are you a seller?
          </label>
        </div>
        <select
          className="custom-select"
          onChange={(e) => setPayment(e.target.value)}
        >
          <option selected>Select Your Payment Method</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="WeChat Pay">WeChat Pay</option>
        </select>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            id="customFile"
            name="avatar"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
