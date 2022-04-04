import "./Profile.css";
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProfile,
  isLoadingProfile,
  isErrorProfile,
  selectImgUrl,
  fetchProfile,
} from "../../features/Profile/ProfileSlice";
import TopBar from "../TopBar/TopBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const img = useSelector(selectImgUrl);
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(isLoadingProfile);
  const isError = useSelector(isErrorProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(profile.email);
  const [newName, setNewName] = useState(profile.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editProfile = async () => {
    await axios.put("http://localhost:3001/profile/edit", {
      name: newName,
      email: newEmail,
    });
  };
  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="profile">
      <TopBar />
      <div className="profile-container">
        <img
          src={`data:image/${profile.avatar_type};base64, ${img}`}
          alt=""
          className="img-thumbnail"
        />
        {isEditing && (
          <div className="close-and-done">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setIsEditing(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                editProfile();
                dispatch(fetchProfile());
                setIsEditing(false);
              }}
            >
              Done
            </button>
          </div>
        )}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {!isEditing ? (
              <h4>Name: {profile.name}</h4>
            ) : (
              <input
                type="name"
                class="form-control"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            )}
          </li>
          <li className="list-group-item">
            {!isEditing ? (
              <h4>Email: {profile.email}</h4>
            ) : (
              <input
                type="email"
                class="form-control"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            )}
          </li>
        </ul>
        {profile.isSeller ? (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("addProduct")}
          >
            Add Product
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/orderInfo")}
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;
