import React, { useEffect, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addItem } from "../../../Redux/actions/cartAction";

function ProductCard({ product }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")));
  const [disabled, setDisabled] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    items?.map((item) => {
      if (item._id === product._id) {
        if (item.amt >= item.stock || item.stock === 0) {
          setDisabled(true);
        }
        setDisabled(false);
      }
    });
  }, [items, product._id]);

  const handleAdd = () => {
    dispatch(addItem(product));
    setItems(JSON.parse(localStorage.getItem("items")));
  };

  return (
    <div>
      <div className="verticalCard">
        <div className="col-1">
          <img
            src={product.src}
            alt={product.title}
            title={product.title}
            width="150px"
            height="120px"
          />
          <h4>{product.title}</h4>
        </div>
        <div className="col-2">
          <h4>Type: {product.type}</h4>
          <h4>
            Price: {product.price.toFixed(3)} TND / {product.unit}
          </h4>
          <h4
            style={{ color: disabled || product.stock === 0 ? "red" : "green" }}
          >
            {disabled || product.stock === 0 ? "Out of stock" : "In stock"}
          </h4>
          <button
            className="card-btn"
            disabled={disabled || product.stock === 0}
            onClick={handleAdd}
          >
            <BsFillCartPlusFill className="icon" title="BUY" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
