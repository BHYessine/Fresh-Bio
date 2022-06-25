import "../NavBar/NavBar.css";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ImHome, ImTree, ImCart, ImBubbles2, ImUser } from "react-icons/im";
import { GiFruitBowl } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/FooterPage";
import { getItems } from "../../../Redux/actions/cartAction";
import { clearErr } from "../../../Redux/actions/usersActions";

function NavigationNavbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UsersReducer.isAuth);
  const user = useSelector((state) => state.UsersReducer.user);
  const counter = useSelector((state) => state.cartReducer.counter);
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  const clearError = (e) => {
    dispatch(clearErr());
  };
  return (
    <>
      <div className="navbarContainer">
        <div className="navBar">
          <Link to="/" className="nav-logo" title="Fresh Bio">
            <GiFruitBowl className="logoIcon" />
            <p className="logoTitle">Fresh Bio</p>
          </Link>
          <ul className="nav-links">
            <li>
              <NavLink to="/" activeClassName="active" title="Home">
                <ImHome /> <p className="link-title">Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/All" title="Products">
                <ImTree /> <p className="link-title">Products</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" title="Contact-us">
                <ImBubbles2 /> <p className="link-title">Contact</p>
              </NavLink>
            </li>
          </ul>
          <div className="nav-user">
            {isAuth ? (
              <Link
                to={`/${user.type}/dashboard`}
                className="nav-cart"
                title={user.name}
              >
                <div>{user.name[0]}</div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="nav-cart"
                title="Sign-in"
                onClick={clearError}
              >
                <ImUser className="icon-cart" />
              </Link>
            )}
            <Link to="/cart" className="nav-cart" title="Cart">
              <ImCart className="icon-cart" />
              <span className="nav-counter">{counter}</span>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default NavigationNavbar;
