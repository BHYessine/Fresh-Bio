import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProduct,
} from "../../../Redux/actions/productsActions";
import "./cardProduct.css";
import { MdDelete, MdCreate } from "react-icons/md";
const CardProduct = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="verticalCard" title={product.title}>
      <div className="col-1">
        <img
          src={product.src}
          alt={product.title}
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
        <h4 style={{ color: product.stock < 10 && "red" }}>
          Stock: {product.stock} {product.unit}
        </h4>
        <div className="card-btn">
          <MdDelete
            className="icon"
            title="Delete"
            onClick={() => dispatch(deleteProduct(product._id))}
          />

          <Link to={`/admin/products/edit/${product._id}`}>
            <MdCreate
              className="icon"
              title="Edit"
              onClick={() => dispatch(getProduct(product._id))}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
