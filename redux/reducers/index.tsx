import auth from "./auth";
import alerts from "./auth";
import navigation from "./navigation";
import layout from "./layout";
import { combineReducers } from "redux";
import products from "./products/productsReducers";

import blogs from "./blogs/blogsReducers";

import categories from "./categories/categoriesReducers";

import orders from "./orders/ordersReducers";

import users from "./users/usersReducers";

import feedback from "./feedback/feedbackReducers";

export default combineReducers({
  layout,
  alerts,
  auth,
  navigation,
  products,
  categories,
  orders,
  users,
  blogs,
  feedback,
});
