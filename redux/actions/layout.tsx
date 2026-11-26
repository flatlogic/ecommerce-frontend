export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_SIDEBAR_COLOR = "CHANGE_SIDEBAR_COLOR";
export const CHANGE_NAVBAR_COLOR = "CHANGE_NAVBAR_COLOR";
export const NAVBAR_TYPE_TOGGLE = "NAVBAR_TYPE_TOGGLE";
export const SIDEBAR_TYPE_TOGGLE = "SIDEBAR_TYPE_TOGGLE";

export function changeTheme(payload: string) {
  return {
    type: CHANGE_THEME,
    payload,
  };
}

export function changeSidebarColor(payload: string) {
  return {
    type: CHANGE_SIDEBAR_COLOR,
    payload,
  };
}

export function changeNavbarColor(payload: string) {
  return {
    type: CHANGE_NAVBAR_COLOR,
    payload,
  };
}

export function navbarTypeToggle(value: string) {
  return {
    type: NAVBAR_TYPE_TOGGLE,
    payload: value,
  };
}

export function sidebarTypeToggle(value: string) {
  return {
    type: SIDEBAR_TYPE_TOGGLE,
    payload: value,
  };
}
