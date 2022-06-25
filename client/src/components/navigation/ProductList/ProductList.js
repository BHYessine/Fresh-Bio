import "./ProductList.css";
import { useState } from "react";
import Products from "./Products";
import Filter from "./filter";

function ProductList() {
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(8);

  return (
    <div className="products-container">
      <Filter setList={setList} setTotalPages={setTotalPages} />
      <Products list={list} totalPages={totalPages} />
    </div>
  );
}

export default ProductList;
