export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const OPEN_SIDEBAR = "OPEN_SIDEBAR";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
export const CHANGE_ACTIVE_SIDEBAR_ITEM = "CHANGE_ACTIVE_SIDEBAR_ITEM";

export function toggleSidebar(state: boolean) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: state,
  };
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem: string | null) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}
