import {
  TOGGLE_SIDEBAR,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  CHANGE_ACTIVE_SIDEBAR_ITEM,
} from "../actions/navigation";
import type { LegacyAction } from "redux/legacyTypes";

const initialState = {
  sidebarOpened: false,
  sidebarStatic:
    typeof window !== "undefined"
      ? !!JSON.parse(localStorage.getItem("staticSidebar") ?? "false")
      : false,
  activeItem: JSON.parse(
    typeof window !== "undefined"
      ? (localStorage.getItem("staticSidebar") ?? "false")
      : "false",
  )
    ? window.location.pathname
    : null,
};

export default function runtime(state = initialState, action: LegacyAction) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarStatic:
          typeof action.payload === "boolean"
            ? action.payload
            : state.sidebarStatic,
      };
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem ?? state.activeItem,
      };
    default:
      return state;
  }
}
