import list from "./blogsListReducers";
import form from "./blogsFormReducers";
import { combineReducers } from "redux";

export default combineReducers({
  list,
  form,
});
