import {
  CHANGE_THEME,
  CHANGE_SIDEBAR_COLOR,
  CHANGE_NAVBAR_COLOR,
  NAVBAR_TYPE_TOGGLE,
  SIDEBAR_TYPE_TOGGLE,
} from "@/redux/actions/layout";

import config from "constants/config";
import type { LegacyAction } from "redux/legacyTypes";

export const DashboardThemes = {
  LIGHT: "light",
  DARK: "dark",
};

export const SidebarTypes = {
  SOLID: "solid",
  TRANSPARENT: "transparent",
};

export const NavbarTypes = {
  STATIC: "static",
  FLOATING: "floating",
};

export const LayoutComponents = {
  NAVBAR: "navbar",
  SIDEBAR: "sidebar",
};

Object.freeze(DashboardThemes);
Object.freeze(SidebarTypes);
Object.freeze(NavbarTypes);
Object.freeze(LayoutComponents);

const defaultState = {
  dashboardTheme: DashboardThemes.DARK,
  sidebarColor: DashboardThemes.DARK,
  navbarColor: config.app.colors.light,
  navbarType: NavbarTypes.STATIC,
  sidebarType: SidebarTypes.SOLID,
};

export default function layoutReducer(
  state = defaultState,
  action: LegacyAction,
) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        dashboardTheme:
          typeof action.payload === "string"
            ? action.payload
            : state.dashboardTheme,
      };
    case CHANGE_SIDEBAR_COLOR:
      return {
        ...state,
        sidebarColor:
          typeof action.payload === "string"
            ? action.payload
            : state.sidebarColor,
      };
    case CHANGE_NAVBAR_COLOR:
      return {
        ...state,
        navbarColor:
          typeof action.payload === "string"
            ? action.payload
            : state.navbarColor,
      };
    case NAVBAR_TYPE_TOGGLE:
      return {
        ...state,
        navbarType:
          typeof action.payload === "string"
            ? action.payload
            : state.navbarType,
      };
    case SIDEBAR_TYPE_TOGGLE:
      return {
        ...state,
        sidebarType:
          typeof action.payload === "string"
            ? action.payload
            : state.sidebarType,
      };
    default:
      return state;
  }
}
