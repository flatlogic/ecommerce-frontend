import type { LegacyReducerAction } from "redux/legacyTypes";

const initialData = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (
  state = initialData,
  { type, payload = {} }: LegacyReducerAction,
) => {
  if (type === "BLOGS_FORM_RESET") {
    return {
      ...initialData,
    };
  }

  if (type === "BLOGS_FORM_FIND_STARTED") {
    return {
      ...state,
      record: null,
      findLoading: true,
    };
  }

  if (type === "BLOGS_FORM_FIND_SUCCESS") {
    return {
      ...state,
      record: payload,
      findLoading: false,
    };
  }

  if (type === "BLOGS_FORM_FIND_ERROR") {
    return {
      ...state,
      record: null,
      findLoading: false,
    };
  }

  if (type === "BLOGS_FORM_CREATE_STARTED") {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === "BLOGS_FORM_CREATE_SUCCESS") {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === "BLOGS_FORM_CREATE_ERROR") {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === "BLOGS_FORM_UPDATE_STARTED") {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === "BLOGS_FORM_UPDATE_SUCCESS") {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === "BLOGS_FORM_UPDATE_ERROR") {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
