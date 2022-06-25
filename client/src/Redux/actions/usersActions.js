import axios from "axios";
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

//REGISTER
export const register = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.post(
      "https://fresh-bio.herokuapp.com/api/users/register",
      user
    );
    // let res = await axios.post(
    //   "http://localhost:5000/api/users/register",
    //   user
    // );
    dispatch({ type: REGISTER_USER, payload: res.data });
    history(`/${res.data.newUser.type}/dashboard`);

    dispatch(allUsers());
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//LOGIN
export const login = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.post(
      "https://fresh-bio.herokuapp.com/api/users/login",
      user
    );
    // let res = await axios.post("http://localhost:5000/api/users/login", user);
    dispatch({ type: LOGIN_USER, payload: res.data });
    dispatch(allUsers());
    history(`/${res.data.findUser.type}/dashboard`);
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//CURRENT
export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let res = await axios.get(
      "https://fresh-bio.herokuapp.com/api/users/current",
      config
    );

    // let res = await axios.get(
    //   "http://localhost:5000/api/users/current",
    //   config
    // );
    dispatch({ type: CURRENT_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: FAIL_USER });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//LOGOUT
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

//CLEAR ERROR
export const clearErr = () => {
  return {
    type: CLEAR_ERR,
  };
};

//ALL USERS
export const allUsers = () => async (dispatch) => {
  try {
    let res = await axios.get(
      "https://fresh-bio.herokuapp.com/api/users/allusers"
    );
    // let res = await axios.get("http://localhost:5000/api/users/allusers");

    dispatch({ type: GET_ALL_USERS, payload: res.data });
  } catch (err) {
    dispatch({ type: FAIL_USER });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

// GET USER
export const getUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.get(
      `https://fresh-bio.herokuapp.com/api/users/user${id}`
    );

    // let res = await axios.get(`http://localhost:5000/api/users/user/`);
    dispatch({ type: GET_USER, payload: res.data.user });
  } catch (err) {
    dispatch({ type: FAIL_USER });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//EDIT USER PURCHASES
export const editUser = (id, inputs) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.put(
      `https://fresh-bio.herokuapp.com/api/users/edituser/${id}`,
      inputs
    );
    // let res = await axios.put(
    //   `http://localhost:5000/api/users/edituser/${id}`,
    //   inputs
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
  } catch (err) {
    dispatch({ type: FAIL_USER });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//UPDATE USER PURCHASES STATUS
export const editStatus =
  ({ id, _id }) =>
  async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
      let res = await axios.put(
        `https://fresh-bio.herokuapp.com/api/users/editstatus/${id}`,
        { _id: _id }
      );
      // let res = await axios.put(
      //   `http://localhost:5000/api/users/editstatus/${id}`,
      //   { _id: _id }
      // );
      dispatch({ type: ACTION_MESSAGE, payload: res });
      dispatch(allUsers());
    } catch (err) {
      dispatch({ type: FAIL_USER });
      dispatch({ type: ACTION_MESSAGE, payload: err });
    }
  };

//DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.delete(
      `https://fresh-bio.herokuapp.com/api/users/deleteuser/${id}`
    );
    // let res = await axios.delete(
    //   `http://localhost:5000/api/users/deleteuser/${id}`
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
  } catch (err) {
    dispatch({ type: FAIL_USER });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

//RESET PASSWORD
export const resetPsw = (email, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.post(
      "https://fresh-bio.herokuapp.com/api/users/forgot",
      {
        email: email,
      }
    );
    // let res = await axios.post("http://localhost:5000/api/users/forgot", {
    //   email: email,
    // });

    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
    history("/");
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

export const newPsw = (input, token, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.post(
      `https://fresh-bio.herokuapp.com/api/users/newpsw/${token}`,
      input
    );

    // let res = await axios.post(
    //   `http://localhost:5000/api/users/newpsw/${token}`,
    //   input
    // );

    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
    history("/login");
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

export const sendMessage = (input) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  // console.log(input);
  try {
    let res = await axios.post(
      `https://fresh-bio.herokuapp.com/api/users/sendmessage`,
      input
    );

    // let res = await axios.post(
    //   `http://localhost:5000/api/users/sendmessage`,
    //   input
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};

export const sendNewsLetter = (input) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let res = await axios.post(
      `https://fresh-bio.herokuapp.com/api/users/newsletter`,
      input
    );

    // let res = await axios.post(
    //   `http://localhost:5000/api/users/newsletter`,
    //   input
    // );
    dispatch({ type: ACTION_MESSAGE, payload: res });
    dispatch(allUsers());
  } catch (err) {
    dispatch({ type: FAIL_USER, payload: err.response.data.err });
    dispatch({ type: ACTION_MESSAGE, payload: err });
  }
};
