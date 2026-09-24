import list from "./productsListReducers";
import form from "./productsFormReducers";
import { combineReducers } from "redux";

export default combineReducers({
  list,
  form,
});
