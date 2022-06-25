import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerCard from "./CustomerCard";
import "./customer.css";
import { allUsers } from "../../../Redux/actions/usersActions";

const Customers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.UsersReducer.users);
  const isLoad = useSelector((state) => state.UsersReducer.isLoad);
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className=" container">
      <h1>Customers</h1>
      <div className="customers-list products-list">
        {isLoad ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          users.map((user) => <CustomerCard user={user} />)
        )}
      </div>
    </div>
  );
};

export default Customers;
