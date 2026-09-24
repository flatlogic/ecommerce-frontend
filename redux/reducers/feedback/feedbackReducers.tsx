import list from "@/redux/reducers/feedback/feedbackListReducers";
import form from "@/redux/reducers/feedback/feedbackFormReducers";
import { combineReducers } from "redux";

export default combineReducers({
  list,
  form,
});
