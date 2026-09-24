import type { LegacyReducerAction } from "redux/legacyTypes";

const initialData = {
  rows: [],
  loading: false,
};

export default (
  state = initialData,
  { type, payload = {} }: LegacyReducerAction,
) => {
  if (type === "BLOGS_LIST_FETCH_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "BLOGS_LIST_FETCH_SUCCESS") {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
    };
  }

  if (type === "BLOGS_LIST_FETCH_ERROR") {
    return {
      ...state,
      loading: false,
      rows: [],
    };
  }

  if (type === "BLOGS_LIST_DELETE_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "BLOGS_LIST_DELETE_SUCCESS") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "BLOGS_LIST_DELETE_ERROR") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "BLOGS_LIST_OPEN_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: true,
      idToDelete: payload.id,
    };
  }

  if (type === "BLOGS_LIST_CLOSE_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "BLOGS_LIST_DO_ADD") {
    return {
      ...state,
      rows: payload.product,
    };
  }
  return state;
};
