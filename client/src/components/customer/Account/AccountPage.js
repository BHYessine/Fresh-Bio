import React from "react";
import { useSelector } from "react-redux";
import "./account.css";
const Account = () => {
  const user = useSelector((state) => state.UsersReducer.user);

  return (
    <div className="userContainer container">
      <h1>{user.type === "admin" ? "Account Settings" : "Dashboard"}</h1>
      <div className="userDetail">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/fresh-bio.appspot.com/o/user.png?alt=media&token=85b6d45f-a994-47fe-a71c-31b6b5ba13c5"
          alt=""
        />
        <div className="userInfo">
          <label>
            <h2>Full Name:</h2>
            <h4>{user?.name}</h4>
          </label>
          <label>
            <h2>Email Address:</h2>
            <h4>{user?.email}</h4>
          </label>
          <label>
            <h2>Phone Number:</h2>
            <h4>{user?.phone}</h4>
          </label>
          <label>
            <h2>Address:</h2>
            <h4>{user?.address}</h4>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Account;
