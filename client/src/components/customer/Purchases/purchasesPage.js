import React from "react";
import { useSelector } from "react-redux";
import CardOrder from "./cardOrder";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./purchases.css";

const Purchases = () => {
  const user = useSelector((state) => state.UsersReducer.user);
  const isLoad = useSelector((state) => state.UsersReducer.isLoad);
  const isAuth = useSelector((state) => state.UsersReducer.isAuth);

  return (
    <div className=" container">
      <h1>Purchases</h1>
      {isLoad ? (
        <div className="loader"></div>
      ) : (
        <div className="purchasesContainer">
          {isAuth && user.orders?.length === 0 ? (
            <div className="cartEmpty">
              <AiOutlineShoppingCart className="iconEmpty" />
              <h3 className="txtEmpty">Your basket is empty !</h3>
            </div>
          ) : (
            user.orders?.map((item) => {
              return (
                <div className="purchasesDetail">
                  <div className="orderCode">
                    <h4>Order Code: {item._id}</h4>
                    <h4>Order Date: {item.createdAt.split("T")[0]}</h4>
                    <h4>Order Total: {item.sum.toFixed(3)} TND</h4>
                    <h4>{item.status ? "Delivered" : "Not Delivered"}</h4>
                  </div>
                  <CardOrder order={item.products} />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Purchases;
