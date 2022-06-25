import {
  ADD_ITEM,
  CLEAR_CART,
  DECREASE,
  GET_ITEMS,
  GET_ITEMS_LOAD,
  INCREASE,
  REMOVE_ITEM,
} from "../types/types";

const initialState = {
  items: [],
  item: {},
  isLoad: false,
  isError: false,
  message: "",
  counter: 0,
  total: 0,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS_LOAD:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ITEMS:
      return {
        ...state,
        items: JSON.parse(localStorage.getItem("items")) || [],
        counter: JSON.parse(localStorage.getItem("counter")) || 0,
        total: JSON.parse(localStorage.getItem("total")) || 0,
        isLoad: false,
        isError: false,
      };
    case ADD_ITEM:
      if (state.items.length === 0) {
        state.items.push(payload);
        state.total = payload.price;
        localStorage.setItem("items", JSON.stringify(state.items));
        localStorage.setItem("counter", JSON.stringify(state.counter + 1));
        localStorage.setItem("total", JSON.stringify(state.total));
      } else {
        let check = false;
        let index = state.items.findIndex((item) => item._id === payload._id);
        state.items.map((item) => {
          if (item._id === payload._id) {
            state.total = state.total + payload.price;
            state.items[index].amt++;
            check = true;
          }
          return;
        });
        if (!check) {
          state.items.push(payload);
          state.total = state.total + payload.price;
        }
        localStorage.setItem("items", JSON.stringify(state.items));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("counter", JSON.stringify(state.counter + 1));
      }
      return {
        ...state,
        counter: state.counter + 1,
      };

    case INCREASE:
      let index = state.items.findIndex((item) => item._id === payload);
      const amt = state.items[index].amt;
      if (amt > 1) {
        state.items[index].amt--;
        state.counter--;
        state.total = state.total - state.items[index].price;
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("counter", JSON.stringify(state.counter));
        localStorage.setItem("items", JSON.stringify(state.items));
      }
      return {
        ...state,
        items: [...state.items],
      };
    case DECREASE:
      let key = state.items.findIndex((item) => item._id === payload);

      if (state.items[key].amt <= state.items[key].stock) {
        state.items[key].amt++;
        state.counter++;
        state.total = state.total + state.items[key].price;
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("counter", JSON.stringify(state.counter));
        localStorage.setItem("items", JSON.stringify(state.items));
      }
      return {
        ...state,
        items: [...state.items],
      };
    case REMOVE_ITEM:
      const id = state.items.findIndex((item) => item._id === payload);

      state.counter = state.counter - state.items[id].amt;
      state.total = state.total - state.items[id].price * state.items[id].amt;
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("counter", JSON.stringify(state.counter));
      localStorage.setItem(
        "items",
        JSON.stringify(state.items.filter((item) => item._id !== payload))
      );
      return {
        ...state,
        items: [...state.items],
      };
    case CLEAR_CART:
      localStorage.setItem("total", 0);
      localStorage.setItem("counter", 0);
      localStorage.setItem("items", JSON.stringify([]));
      return {
        ...state,
        items: [],
        Total: 0,
        Counter: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
