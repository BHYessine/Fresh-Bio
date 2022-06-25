import React from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
} from "react-icons/bs";

const Pagination = ({ totalPosts, totalPages, paginate, activePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / totalPages); i++) {
    pageNumbers.push(i);
  }
  const style = {
    backgroundColor: "rgb(255, 153, 0)",
    color: "white",
  };
  if (pageNumbers.length < activePage) {
    paginate(1);
  }
  return (
    <ul
      className="numberList"
      style={pageNumbers.length < 2 ? { display: "none" } : null}
    >
      <button
        onClick={() => paginate(1)}
        disabled={activePage <= 1}
        className="btn-page"
        title="First"
      >
        <BsChevronDoubleLeft />
      </button>
      <button
        onClick={() => paginate(activePage - 1)}
        disabled={activePage <= 1}
        className="btn-page"
        title="Prev"
      >
        <BsChevronLeft />
      </button>
      {pageNumbers.map((number) => (
        <li key={number} className="pageNumber">
          <button
            onClick={() => paginate(number)}
            className="btn-page"
            style={number === activePage ? style : null}
            title={number}
          >
            {number}
          </button>
        </li>
      ))}
      <button
        onClick={() => paginate(activePage + 1)}
        disabled={activePage === pageNumbers.length}
        className="btn-page"
        title="Next"
      >
        <BsChevronRight />
      </button>
      <button
        onClick={() => paginate(pageNumbers.length)}
        disabled={activePage === pageNumbers.length}
        className="btn-page"
        title="Last"
      >
        <BsChevronDoubleRight />
      </button>
    </ul>
  );
};
export default Pagination;
