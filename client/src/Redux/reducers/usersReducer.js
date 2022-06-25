import {
  ACTION_MESSAGE,
  CLEAR_ERR,
  CURRENT_USER,
  FAIL_USER,
  GET_ALL_USERS,
  GET_USER,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../types/types";

const initialState = {
  users: [],
  user: {},
  customer: {},
  isLoad: false,
  isError: false,
  isAuth: false,
  message: "",
  status: 0,
  errors: [],
};

const UsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, isLoad: true };
    case REGISTER_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.newUser,
        isAuth: true,
        isLoad: false,
      };
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.findUser,
        isAuth: true,
        isLoad: false,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: payload.user,
        isLoad: false,
        isAuth: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        isLoad: false,
        isAuth: false,
      };
    case CLEAR_ERR:
      return {
        ...state,
        isError: false,
        errors: [],
      };
    case FAIL_USER:
      return {
        ...state,
        isError: true,
        isLoad: false,
        errors: payload,
        status: 400,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload.allUsers,
        isLoad: false,
        isError: false,
        status: 200,
      };
    case GET_USER:
      return {
        ...state,
        customer: payload,
        isLoad: false,
        isError: false,
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

export default UsersReducer;
