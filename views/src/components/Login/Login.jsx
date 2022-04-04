import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { setLoggedIn, fetchProfile } from "../../features/Profile/ProfileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: {
        username: email,
        password,
      },
    });
    if (response.data.success) {
      dispatch(setLoggedIn(true));
      dispatch(fetchProfile());
      navigate("/");
    } else {
      return <h1>Wrong password or Username</h1>;
    }
  };
  return (
    <div className="login">
      <h3>A.Shop</h3>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary">
          Sign In
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/register")}
          style={{ marginLeft: "45px" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
