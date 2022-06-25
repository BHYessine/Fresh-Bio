import React, { useEffect, useState } from "react";
import { ImFilter, ImSearch, ImShuffle } from "react-icons/im";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Redux/actions/productsActions";
import { Link, useParams } from "react-router-dom";

const Filter = ({ setList, setTotalPages }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("az");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryResult, setCategoryResult] = useState([]);
  const [sortResult, setSortResult] = useState([]);
  const params = useParams();

  useEffect(() => {
    dispatch(getProducts());
    setCategory(params.category);
  }, [dispatch, params.category]);

  //SEARCH FILTER
  useEffect(() => {
    const result = products.filter((item) =>
      item.title.toLowerCase().startsWith(keyword.toLowerCase())
    );
    setSearchResult(result);
  }, [keyword, products]);

  //CATEGORY FILTER
  useEffect(() => {
    category === "All"
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
            return a.price - b.price;
          })
        )
      : sort === "dec"
      ? setSortResult(
          [...categoryResult].sort((a, b) => {
            return b.price - a.price;
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
  }, [setList, sortResult]);

  return (
    <div className=" filterList ">
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
              <Link to={"/products/All"}>
                <input
                  type="radio"
                  value="All"
                  checked={category === "All"}
                  onClick={(e) => setCategory(e.target.value)}
                  defaultChecked
                />
              </Link>
              All
            </label>

            <label>
              <Link to={"/products/Vegetable"}>
                <input
                  type="radio"
                  value="Vegetable"
                  checked={category === "Vegetable"}
                  onClick={(e) => setCategory(e.target.value)}
                  defaultChecked
                />
              </Link>
              Vegetable
            </label>

            <label>
              <Link to={"/products/Fruit"}>
                <input
                  type="radio"
                  value="Fruit"
                  checked={category === "Fruit"}
                  onClick={(e) => setCategory(e.target.value)}
                />
              </Link>
              Fruit
            </label>

            <label>
              <Link to={"/products/Meat"}>
                <input
                  type="radio"
                  value="Meat"
                  checked={category === "Meat"}
                  onClick={(e) => setCategory(e.target.value)}
                />
              </Link>
              Meat
            </label>

            <label>
              <Link to={"/products/Chicken"}>
                <input
                  type="radio"
                  value="Chicken"
                  checked={category === "Chicken"}
                  onClick={(e) => setCategory(e.target.value)}
                />
              </Link>
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
                defaultChecked
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
              Ascending Price
            </label>

            <label>
              <input
                type="radio"
                value="dec"
                checked={sort === "dec"}
                onClick={(e) => setSort(e.target.value)}
              />
              Decreasing Price
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
