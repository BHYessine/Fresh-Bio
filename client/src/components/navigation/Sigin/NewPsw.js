import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { newPsw } from "../../../Redux/actions/usersActions";

function NewPsw() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState([]);
  const history = useNavigate();
  const errors = useSelector((state) => state.UsersReducer.errors);
  const { token } = useParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newPsw(user, token, history));
  };
  useEffect(() => {
    setMsg(errors);
  }, [errors]);
  return (
    <div className="contactContainer product-details">
      <h1>Create New Password</h1>
      <form onSubmit={handleSubmit} className="product-action">
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
            placeholder="Confirm Password..."
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

        <div className="btn-action">
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
}

export default NewPsw;
