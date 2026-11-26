import list from "./categoriesListReducers";
import form from "./categoriesFormReducers";
import { combineReducers } from "redux";

export default combineReducers({
  list,
  form,
});
