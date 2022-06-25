import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  MdDashboard,
  MdStore,
  MdProductionQuantityLimits,
  MdSupervisorAccount,
  MdMarkAsUnread,
  MdLogout,
  MdReorder,
  MdManageAccounts,
  MdHouse,
  MdShoppingCart,
} from "react-icons/md";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { current, logout } from "../../../Redux/actions/usersActions";
function Navbar() {
  const user = useSelector((state) => state.UsersReducer.user);
  const isLoad = useSelector((state) => state.UsersReducer.isLoad);
  const isAuth = useSelector((state) => state.UsersReducer.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);
  return (
    <div>
      <div className="navbar">
        <div className="menu">
          <MdReorder className="icon" />
          <p>Menu</p>
        </div>

        <NavLink to={`/${user?.type}/dashboard`} activeClassName="active">
          <MdDashboard className="icon" />
          <p>Dashboard</p>
        </NavLink>
        {user?.type === "admin" && (
          <NavLink to="/admin/products">
            <MdStore className="icon" />
            <p>Products</p>
          </NavLink>
        )}
        {user?.type === "admin" && (
          <NavLink to="/admin/orders">
            <MdProductionQuantityLimits className="icon" />
            <p>Orders</p>
          </NavLink>
        )}
        {user?.type === "admin" && (
          <NavLink to="/admin/customers">
            <MdSupervisorAccount className="icon" />
            <p>Customers</p>
          </NavLink>
        )}
        {user?.type === "admin" && (
          <NavLink to="/admin/newsletter">
            <MdMarkAsUnread className="icon" />
            <p>Newsletter</p>
          </NavLink>
        )}
        {user?.type === "admin" && (
          <NavLink to={`/admin/account`}>
            <MdManageAccounts className="icon" />
            <p>Account</p>
          </NavLink>
        )}
        {user?.type === "customer" && (
          <NavLink to="/customer/purchases">
            <MdShoppingCart className="icon" />
            <p>Purchases</p>
          </NavLink>
        )}
        <Link to="/" className="home">
          <MdHouse className="icon" />
          <p>Home</p>
        </Link>
        <div className="logout">
          <div className="nav-cart" title={isAuth && user?.name}>
            <div>{isAuth && user?.name[0]}</div>
          </div>
          <Link to="/" onClick={() => dispatch(logout())}>
            <p>Logout</p>
            <MdLogout className="icon" />
          </Link>
        </div>
      </div>
      {/* {isLoad ? <div className="loader"></div> :  */}
      <Outlet />
      {/* } */}
    </div>
  );
}

export default Navbar;
