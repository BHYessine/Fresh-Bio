import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, clearErr } from "../../../Redux/actions/usersActions";

const Register = ({ setRegister }) => {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState([]);
  const errors = useSelector((state) => state.UsersReducer.errors);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user, history));
  };
  const clearError = (e) => {
    dispatch(clearErr());
  };
  useEffect(() => {
    setMsg(errors);
  }, [errors]);
  return (
    <div className="contactContainer product-details">
      <h1>CREATE A NEW CUSTOMER ACCOUNT:</h1>
      <form onSubmit={handleSubmit} className="product-action">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name..."
            value={user.name}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "name")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter Email..."
            value={user.email}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "email")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password_1"
            placeholder="Enter Password..."
            value={user.password_1}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "password_1")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="password_2"
            placeholder="Enter Password..."
            value={user.password_2}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "password_2")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number..."
            value={user.phone}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "phone")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            placeholder="Enter Address..."
            value={user.address}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "address")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <div className="btn-action">
          <button type="submit">Create Account</button>
          <Link to="/login" onClick={clearError}>
            Already Customer
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
