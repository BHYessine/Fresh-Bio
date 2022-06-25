import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import "./Cart.css";
import {
  clearCart,
  decrease,
  increase,
  removeItem,
} from "../../../Redux/actions/cartAction";
const Cart = () => {
  const items = useSelector((state) => state.cartReducer.items);
  const total = useSelector((state) => state.cartReducer.total);
  const isLoad = useSelector((state) => state.cartReducer.isLoad);
  const dispatch = useDispatch();
  return (
    <div className="cartContainer">
      {isLoad ? (
        <div className="loader"></div>
      ) : (
        <div className="cartList">
          <div className="cartDetails">
            <ul className="cartHeader">
              <li className="itemTitle">
                <h4>Title</h4>
              </li>
              <li className="itemPrice">
                <h4>Price/Unit</h4>
              </li>
              <li className="itemQuantity">
                <h4>Quantity</h4>
              </li>
              <li className="itemTotal">
                <h4>Total</h4>
              </li>
            </ul>
            <ul className="cartItems">
              {items.length === 0 ? (
                <div className="cartEmpty">
                  <AiOutlineShoppingCart className="iconEmpty" />
                  <h3 className="txtEmpty">Your basket is empty !</h3>
                </div>
              ) : (
                items?.map((item) => {
                  const total = item.price * item.amt;
                  return (
                    <li className="itemDetails">
                      <div className="itemTitle">
                        <img src={item.src} width="90px" height="70px" alt="" />
                        <p>{item.title}</p>
                      </div>
                      <div className="itemPrice">
                        <p>
                          {item.price.toFixed(3)} TND / {item.unit}
                        </p>
                      </div>
                      <div className="itemQuantity">
                        <button
                          className="icon-item dash"
                          title="increase"
                          onClick={() => dispatch(increase(item._id))}
                          disabled={item.amt === 1}
                        >
                          &#8211;
                        </button>
                        <span style={{ width: "20px" }}>{item.amt}</span>
                        <button
                          className="icon-item plus"
                          title="decrease"
                          onClick={() => dispatch(decrease(item._id))}
                          disabled={item.amt >= item.stock}
                        >
                          &#43;
                        </button>

                        <AiFillDelete
                          className="icon-item delete"
                          title="remove"
                          onClick={() => dispatch(removeItem(item._id))}
                        />
                      </div>
                      <div className="itemTotal">{total.toFixed(3)} TND</div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="cartTotal">
            <p>Total Purchases :</p>
            <span>{Number(total).toFixed(3)} TND</span>
            <Link to="/order">
              <button disabled={items.length === 0}>Order Purchases</button>
            </Link>

            {items.length !== 0 && (
              <button onClick={() => dispatch(clearCart())}>
                Clear Basket
                <MdOutlineRemoveShoppingCart className="return" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
