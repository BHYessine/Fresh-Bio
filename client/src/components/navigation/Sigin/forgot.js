import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErr, resetPsw } from "../../../Redux/actions/usersActions";

function Forgot() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState([]);
  const history = useNavigate();
  const errors = useSelector((state) => state.UsersReducer.errors);
  // const message = useSelector((state) => state.UsersReducer.message);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPsw(user.email, history));
  };
  const clearError = (e) => {
    dispatch(clearErr());
  };
  useEffect(() => {
    setMsg(errors);
  }, [errors]);

  return (
    <div className="contactContainer product-details">
      <h1>Forgot Password</h1>
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

        <div className="btn-action">
          <button type="submit">Submit</button>
          <Link to="/login" onClick={clearError}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Forgot;
