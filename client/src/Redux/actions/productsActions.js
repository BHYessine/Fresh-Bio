import axios from "axios";
import {
  ACTION_MESSAGE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_LOAD,
} from "../types/types";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOAD });
  try {
    let res = await axios.get(
      `https://fresh-bio.herokuapp.com/api/products/allproducts`
    );
    // let res = await axios.get(`http://localhost:5000/api/products/allproducts`);

    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    dispatch({ type: ACTION_MESSAGE, payload: res });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, error });
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOAD });
  try {
    let res = await axios.get(
      `https://fresh-bio.herokuapp.com/api/products/product/${id}`
    );
    // let res = await axios.get(
    //   `http://localhost:5000/api/products/product/${id}`
    // );
    dispatch({ type: GET_PRODUCT, payload: res.data });
    dispatch({ type: ACTION_MESSAGE, payload: res });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, error });
  }
};

export const addProduct = (inputs) => async (dispatch) => {
  try {
    let res = await axios.post(
      "https://fresh-bio.herokuapp.com/api/products/addproduct",
      inputs
    );
    // let res = await axios.post(
    //   "http://localhost:5000/api/products/addproduct",
    //   inputs
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(getProducts());
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, error });
  }
};

export const editProduct = (id, inputs) => async (dispatch) => {
  try {
    let res = await axios.put(
      `https://fresh-bio.herokuapp.com/api/products/editproduct/${id}`,
      inputs
    );
    // let res = await axios.put(
    //   `http://localhost:5000/api/products/editproduct/${id}`,
    //   inputs
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(getProducts());
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, error });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(
      `https://fresh-bio.herokuapp.com/api/products/deleteproduct/${id}`
    );
    // let res = await axios.delete(
    //   `http://localhost:5000/api/products/deleteproduct/${id}`
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(getProducts());
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, error });
  }
};
