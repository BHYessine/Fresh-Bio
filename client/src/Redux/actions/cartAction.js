import {
  ACTION_MESSAGE,
  ADD_ITEM,
  CLEAR_CART,
  DECREASE,
  GET_ITEMS,
  GET_ITEMS_FAIL,
  GET_ITEMS_LOAD,
  INCREASE,
  REMOVE_ITEM,
} from "../types/types";

export const getItems = () => async (dispatch) => {
  dispatch({ type: GET_ITEMS_LOAD });
  try {
    dispatch({ type: GET_ITEMS });
    // dispatch({ type: ACTION_MESSAGE, payload: "Here are all Items" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};

export const addItem = (item) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ITEM, payload: item });
    dispatch(getItems());
    dispatch({ type: ACTION_MESSAGE, payload: "item added succ" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};

export const increase = (id) => async (dispatch) => {
  try {
    dispatch({ type: INCREASE, payload: id });
    dispatch(getItems());
    dispatch({ type: ACTION_MESSAGE, payload: "item added succ" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};

export const decrease = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECREASE, payload: id });
    dispatch(getItems());
    dispatch({ type: ACTION_MESSAGE, payload: "item added succ" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};

export const removeItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ITEM, payload: id });
    dispatch(getItems());
    dispatch({ type: ACTION_MESSAGE, payload: "item removed succ" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART });
    dispatch(getItems());
    dispatch({ type: ACTION_MESSAGE, payload: "cart cleared succ" });
  } catch (error) {
    dispatch({ type: GET_ITEMS_FAIL });
    dispatch({ type: ACTION_MESSAGE, payload: error.message });
  }
};
