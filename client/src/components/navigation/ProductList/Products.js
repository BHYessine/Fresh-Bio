import "./ProductList.css";
import ProductCard from "./ProductCard";
import { useState } from "react";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

function Products({ list, totalPages }) {
  const isLoad = useSelector((state) => state.productReducer.isLoad);

  const [currentPage, setCurrentPage] = useState(1);
  const indexLastPost = currentPage * totalPages;
  const indexFirstPost = indexLastPost - totalPages;
  const currentPosts = list.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoad ? (
        <div className="loader"></div>
      ) : (
        <div className="containerItems">
          <div className="productsContainer">
            {currentPosts.map((item) => {
              return <ProductCard product={item} />;
            })}
          </div>

          <Pagination
            totalPages={totalPages}
            totalPosts={list.length}
            paginate={paginate}
            activePage={currentPage}
          />
        </div>
      )}
    </>
  );
}
export default Products;
