import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineTeam } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUsersSlash } from "react-icons/fa";
import ModalUser from "./ModalUser";
import { allUsers } from "../../../Redux/actions/usersActions";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const users = useSelector((state) => state.UsersReducer.users);
  const isLoad = useSelector((state) => state.UsersReducer.isLoad);
  let order = 0;
  let sum = 0;
  users.map((user) => {
    order = order + user.orders.length;
    user.orders.map((item) => {
      sum = sum + item.sum;
    });
  });
  const showUser = (user) => {
    setUser(user);
    setShow(true);
  };
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="dashboard-list container">
      <h1>Dashboard</h1>
      {isLoad ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="dashboard-details">
          <div className="row-1">
            <div className="info">
              <AiOutlineTeam className="icon-info" />
              <h4>{users.length.toFixed(2)} Customers</h4>
            </div>
            <div className="info">
              <AiOutlineShoppingCart className="icon-info" />
              <h4> {order.toFixed(2)} Orders</h4>
            </div>
            <div className="info">
              <GiReceiveMoney className="icon-info" />
              <h4>{sum.toFixed(3)} TND Earning</h4>
            </div>
          </div>

          <div className="row-2">
            <ul className="cartHeader">
              <li className="itemTitle">Id</li>
              <li className="itemQuantity">Full Name</li>
              <li className="itemPrice">Orders</li>
              <li className="itemQuantity">Last Action</li>
            </ul>
            <ul className="cartItems">
              {users.length === 0 ? (
                <div className="cartEmpty">
                  <FaUsersSlash className="iconEmpty" />
                  <h3 className="txtEmpty">Your List is empty !</h3>
                </div>
              ) : (
                users?.map((user) => {
                  return (
                    <ul className="itemDetails">
                      <li className="itemTitle">{user._id}</li>
                      <li className="itemQuantity">{user.name}</li>
                      <li className="itemPrice">
                        {user.orders.length.toFixed(2)}{" "}
                      </li>
                      <li className="itemQuantity">
                        {user.updatedAt.split("T")[0]}
                      </li>
                      <li onClick={() => showUser(user)} className="btn-show">
                        More Detail
                      </li>
                    </ul>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}
      <ModalUser user={user} show={show} setShow={setShow} />
    </div>
  );
};

export default DashboardAdmin;
