import "./HomePage.css";
import React from "react";
import { MdDeliveryDining, MdSupportAgent } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homeContainer">
      <div className="products">
        <Link to={"/products/Vegetable"} className="productType type-1">
          <div className="productDetail">
            <h2>Vegetable of Month</h2>
          </div>
        </Link>
        <Link to={"/products/Fruit"} className="productType type-2">
          <div className="productDetail">
            <h2>Fruit of Month</h2>
          </div>
        </Link>
        <Link to={"/products/Meat"} className="productType type-3">
          <div className="productDetail">
            <h2>Fresh Meat</h2>
          </div>
        </Link>
        <Link to={"/products/Chicken"} className="productType type-4">
          <div className="productDetail">
            <h2>Fresh Chicken</h2>
          </div>
        </Link>
      </div>

      <div className="services">
        <div className="service">
          <MdDeliveryDining className="icon-service" />
          <div className="txt-service">
            <h3>Free Delivery</h3>
            <h5>Order's Over 100TND</h5>
          </div>
        </div>
        <div className="service">
          <GrMoney className="icon-service" />
          <div className="txt-service">
            <h3>Variety Payment</h3>
            <h5>Online or Cash Payment</h5>
          </div>
        </div>
        <div className="service">
          <MdSupportAgent className="icon-service" />
          <div className="txt-service">
            <h3>Online Support</h3>
            <h5>Available 24Hours 7/7</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
