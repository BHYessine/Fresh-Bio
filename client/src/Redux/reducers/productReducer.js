import {
  GET_PRODUCTS_LOAD,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_FAIL,
  ACTION_MESSAGE,
  GET_PRODUCT,
} from "../types/types";

const initialState = {
  products: [],
  product: {},
  isLoad: false,
  isError: false,
  message: "",
  status: 0,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_LOAD:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload.allProducts,
        isLoad: false,
        isError: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload.product,
        isLoad: false,
        isError: false,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        isError: true,
      };
    case ACTION_MESSAGE:
      return {
        ...state,
        message: payload.data.message,
        status: payload.status,
      };
    default:
      return state;
  }
};

export default productReducer;
