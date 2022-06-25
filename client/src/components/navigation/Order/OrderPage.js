import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../../Redux/actions/cartAction";
import { editProduct } from "../../../Redux/actions/productsActions";
import { current, editUser } from "../../../Redux/actions/usersActions";
import Login from "../Sigin/login";
import "./Order.css";

const Order = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.UsersReducer.isAuth);
  const user = useSelector((state) => state.UsersReducer.user);
  const items = useSelector((state) => state.cartReducer.items);
  const total = useSelector((state) => state.cartReducer.total);

  let delivery = 0;

  const handlePurchase = () => {
    items.map((item) => {
      dispatch(
        editProduct(item._id, { ...item, stock: item.stock - item.amt, amt: 1 })
      );
    });
    dispatch(editUser(user._id, { products: items, sum: total }));
    dispatch(clearCart());
  };
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);
  return (
    <div>
      {isAuth ? (
        <div className="purchaseContainer">
          <div className="customerDetails">
            <h1>Customer Details :</h1>
            <h4>
              <label>Full Name : </label>
              {user?.name}
            </h4>
            <h4>
              <label>Delivery Address : </label>
              {user?.address}
            </h4>
            <h4>
              <label>Phone Number :</label> {user?.phone}
            </h4>
            <h4>
              <label>Address Email:</label> {user?.email}
            </h4>
            <div className="total">
              <h4>
                Delivery Cost:
                {total < 100 ? (delivery = 7).toFixed(3) + "TND" : "Free"}{" "}
              </h4>
              <h4>Total Amount : {(total + delivery).toFixed(3)} TND</h4>

              <div className="btn-purchase">
                <Link to="/cart">
                  <button>Return</button>
                </Link>

                <Link to="/" onClick={() => handlePurchase()}>
                  <button className="submit">Purchase</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="cartDetails">
            <h1>Cart Details :</h1>
            <div className="cartProducts">
              {items.map((item) => {
                return (
                  <div className="product">
                    <img src={item.src} alt={item.title} />
                    <h5>
                      {item.title} : {item.amt.toFixed(2)} {item.unit}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Order;
