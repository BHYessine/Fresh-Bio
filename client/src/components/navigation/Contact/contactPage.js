import React, { useEffect, useState } from "react";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErr, sendMessage } from "../../../Redux/actions/usersActions";

const Contact = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const [msg, setMsg] = useState([]);
  const errors = useSelector((state) => state.UsersReducer.errors);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(input));
    console.log(input);
    dispatch(clearErr());
  };

  useEffect(() => {
    setMsg(errors);
  }, [errors]);
  return (
    <div className="contactContainer product-details">
      <h1>Contact us:</h1>
      <form onSubmit={handleSubmit} className="product-action">
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject..."
            value={input.subject}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "subject")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name..."
            value={input.name}
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
            value={input.email}
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
          Message:
          <textarea
            name="message"
            placeholder="Enter Message..."
            value={input.message}
            onChange={handleChange}
          />
          {msg
            ?.filter((err) => err.param === "message")
            .slice(0, 1)
            .map((err) => (
              <div className="error">{err.msg}</div>
            ))}
        </label>
        <div className="btn-action">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
