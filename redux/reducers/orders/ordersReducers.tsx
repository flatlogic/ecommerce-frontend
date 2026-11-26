import list from "./ordersListReducers";
import form from "./ordersFormReducers";
import { combineReducers } from "redux";

export default combineReducers({
  list,
  form,
});
