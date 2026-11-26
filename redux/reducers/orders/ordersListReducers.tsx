import type { LegacyReducerAction } from "redux/legacyTypes";

const initialData = {
  rows: [],
  loading: false,
};

export default (
  state = initialData,
  { type, payload = {} }: LegacyReducerAction,
) => {
  if (type === "ORDERS_LIST_FETCH_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "ORDERS_LIST_FETCH_SUCCESS") {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
    };
  }

  if (type === "ORDERS_LIST_FETCH_ERROR") {
    return {
      ...state,
      loading: false,
      rows: [],
    };
  }

  if (type === "ORDERS_LIST_DELETE_STARTED") {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === "ORDERS_LIST_DELETE_SUCCESS") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "ORDERS_LIST_DELETE_ERROR") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === "ORDERS_LIST_OPEN_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: true,
      idToDelete: payload.id,
    };
  }

  if (type === "ORDERS_LIST_CLOSE_CONFIRM") {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  return state;
};
