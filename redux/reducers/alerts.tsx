import { DISMISS_ALERT } from "../actions/alerts";
import type { LegacyAction } from "redux/legacyTypes";

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: "Sales Report",
      value: 16,
      color: "primary",
      footer: "Calculating x-axis bias... 65%",
    },
    {
      id: 1,
      title: "Personal Responsibility",
      value: 23,
      color: "danger",
      footer: "Provide required notes",
    },
  ],
};

export default function alertsReducer(
  state = defaultState,
  action: LegacyAction,
) {
  switch (action.type) {
    case DISMISS_ALERT: {
      const index = state.alertsList.findIndex(
        (alert) => alert.id === action.id,
      );
      if (index < 0) return state;
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
          ...state.alertsList.slice(index + 1),
        ],
      });
    }
    default:
      return state;
  }
}
