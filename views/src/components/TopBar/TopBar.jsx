import "./TopBar.css";
import React from "react";
import {
  ShopOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  selectLogIn,
  selectImgUrl,
  selectProfile,
  setLoggedIn,
  setProfile,
} from "../../features/Profile/ProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TopBar = () => {
  const LoggedIn = useSelector(selectLogIn);
  const img = useSelector(selectImgUrl);
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = async () => {
    const response = await axios.get("http://localhost:3001/logout");
    if (response.data.logout) {
      dispatch(setLoggedIn(false));
      dispatch(setProfile({ profile: {}, imgUrl: "" }));
      navigate("/");
    }
  };

  if (!LoggedIn) {
    return (
      <div className="topBar">
        <div className="shop-logo">
          <Link to="/">
            <ShopOutlined style={{ fontSize: "40px", color: "#534848" }} />
          </Link>
          <h1>A.Shop</h1>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/login")}
        >
          {
            <LoginOutlined
              style={{
                fontSize: "20px",
                paddingRight: "10px",
                color: "#534848",
              }}
            />
          }
          Log In
        </button>
      </div>
    );
  } else {
    return (
      <div className="topBar">
        <div className="shop-logo">
          <Link to="/">
            <ShopOutlined style={{ fontSize: "40px", color: "#534848" }} />
          </Link>
          <h1>A.Shop</h1>
        </div>
        <div className="avatar-and-logout">
          <Link to="/profile">
            <img
              src={`data:image/${profile.avatar_type};base64, ${img}`}
              alt=""
              className="rounded-circle"
            ></img>
          </Link>
          <Link to="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#534848" }}
            />
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => logOut()}
          >
            {
              <LogoutOutlined
                style={{
                  fontSize: "20px",
                  paddingRight: "10px",
                  color: "#534848",
                }}
              />
            }
            Log Out
          </button>
        </div>
      </div>
    );
  }
};

export default TopBar;
