import { combineReducers } from "redux";
import productReducer from "./productReducer";
import UsersReducer from "./usersReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  productReducer,
  UsersReducer,
  cartReducer,
});

export default rootReducer;
