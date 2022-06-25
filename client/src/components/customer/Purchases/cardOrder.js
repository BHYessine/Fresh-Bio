import React from "react";

const CardOrder = ({ order }) => {
  return (
    <div className="orderList">
      {order.map((item) => {
        return (
          <div className="cartProducts">
            <div className="product">
              <img src={item.src} alt={item.title} />
              <h5>
                {item.title} : {item.amt.toFixed(2)} {item.unit}
              </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardOrder;
