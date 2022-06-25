import React, { useEffect, useState } from "react";
import { ImFilter, ImSearch, ImShuffle } from "react-icons/im";
import "../../navigation/ProductList/filter.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Redux/actions/productsActions";

const Filter = ({ setList, setTotalPages }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("az");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryResult, setCategoryResult] = useState([]);
  const [sortResult, setSortResult] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //SEARCH FILTER
  useEffect(() => {
    const result = products.filter((item) =>
      item.title.toLowerCase().startsWith(keyword.toLowerCase())
    );
    setSearchResult(result);
  }, [keyword, products]);

  //CATEGORY FILTER
  useEffect(() => {
    category === "all"
      ? setCategoryResult(searchResult)
      : setCategoryResult(
          searchResult.filter((item) => item.type === category)
        );
  }, [category, searchResult]);

  //SORT FILTER
  useEffect(() => {
    sort === "asc"
      ? setSortResult(
          [...categoryResult].sort((a, b) => {
            return a.stock - b.stock;
          })
        )
      : sort === "dec"
      ? setSortResult(
          [...categoryResult].sort((a, b) => {
            return b.stock - a.stock;
          })
        )
      : sort === "az"
      ? setSortResult(
          [...categoryResult].sort((a, b) => (a.title > b.title ? 1 : -1))
        )
      : sort === "za"
      ? setSortResult(
          [...categoryResult].sort((a, b) => (a.title < b.title ? 1 : -1))
        )
      : setSortResult(categoryResult);
  }, [sort, categoryResult]);
  useEffect(() => {
    setList(sortResult);
  });
  return (
    <div className="filterList container">
      <div className="filterContainer">
        <label className="filter search">
          <div className="filter-title">
            <ImSearch className="filter-icon" />
            Search:
          </div>
          <input
            type="text"
            title="Serach..."
            placeholder="Search..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </label>

        <div className="filter category">
          <div className="filter-title">
            <ImFilter className="filter-icon" />
            Category:
          </div>
          <div className="category">
            <label>
              <input
                type="radio"
                value="all"
                checked={category === "all"}
                onClick={(e) => setCategory(e.target.value)}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                value="Vegetable"
                checked={category === "Vegetable"}
                onClick={(e) => setCategory(e.target.value)}
              />
              Vegetable
            </label>

            <label>
              <input
                type="radio"
                value="Fruit"
                checked={category === "Fruit"}
                onClick={(e) => setCategory(e.target.value)}
              />
              Fruit
            </label>

            <label>
              <input
                type="radio"
                value="Meat"
                checked={category === "Meat"}
                onClick={(e) => setCategory(e.target.value)}
              />
              Meat
            </label>

            <label>
              <input
                type="radio"
                value="Chicken"
                checked={category === "Chicken"}
                onClick={(e) => setCategory(e.target.value)}
              />
              Chicken
            </label>
          </div>
        </div>
        <div className="filter sort">
          <div className="filter-title">
            <ImShuffle className="filter-icon" />
            Sort by:
          </div>
          <div className="category">
            <label>
              <input
                type="radio"
                value="az"
                checked={sort === "az"}
                onClick={(e) => setSort(e.target.value)}
              />
              Title A to Z
            </label>

            <label>
              <input
                type="radio"
                value="za"
                checked={sort === "za"}
                onClick={(e) => setSort(e.target.value)}
              />
              Title Z to A
            </label>

            <label>
              <input
                type="radio"
                value="asc"
                checked={sort === "asc"}
                onClick={(e) => setSort(e.target.value)}
              />
              Ascending Stock
            </label>

            <label>
              <input
                type="radio"
                value="dec"
                checked={sort === "dec"}
                onClick={(e) => setSort(e.target.value)}
              />
              Decreasing Stock
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
