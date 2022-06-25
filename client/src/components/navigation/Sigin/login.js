import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErr } from "../../../Redux/actions/usersActions";
import "./sigin.css";
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState([]);
  const history = useNavigate();
  const errors = useSelector((state) => state.UsersReducer.errors);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, history));
  };
  const clearError = (e) => {
    dispatch(clearErr());
  };
  useEffect(() => {
    setMsg(errors);
  }, [errors]);
  return (
    <div className="contactContainer product-details">
      <h1>CUSTOMER LOGIN:</h1>
      <form onSubmit={handleSubmit} className="product-action">
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
        <Link to="/forgot" onClick={clearError}>
          Forgot Password?
        </Link>
        <div className="btn-action">
          <button type="submit">Login</button>
          <Link to="/register" onClick={clearError}>
            New Customer
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
