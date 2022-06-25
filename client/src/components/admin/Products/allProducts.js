import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Redux/actions/productsActions";
import CardProduct from "./cardProduct";
import "./allProducts.css";
import Filter from "./filter";
const AllProducts = () => {
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.productReducer.isLoad);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <Filter setList={setList} />
      <div>
        {isLoad ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          <div className="products-list container">
            <Link
              to="/admin/products/add"
              className="verticalCard"
              title="Add Product"
            >
              <button>+</button>
            </Link>
            {list.map((el, index) => (
              <CardProduct product={el} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
