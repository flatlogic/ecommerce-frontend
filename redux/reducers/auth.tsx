import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_SUCCESS,
  RESET_REQUEST,
  RESET_SUCCESS,
  PASSWORD_RESET_EMAIL_REQUEST,
  PASSWORD_RESET_EMAIL_SUCCESS,
  AUTH_INIT_SUCCESS,
  AUTH_INIT_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/auth";
import type { LegacyAction } from "redux/legacyTypes";
import { userSchema, type User } from "types/domain";

interface AuthState {
  isFetching: boolean;
  errorMessage: string;
  currentUser: User | null;
  loadingInit: boolean;
}

const initialState: AuthState = {
  isFetching: false,
  errorMessage: "",
  currentUser: null,
  loadingInit: true,
};

export default function auth(
  state = initialState,
  { type, payload }: LegacyAction,
) {
  switch (type) {
    case LOGIN_REQUEST:
    case RESET_REQUEST:
    case PASSWORD_RESET_EMAIL_REQUEST:
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: "",
      });
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RESET_SUCCESS:
    case PASSWORD_RESET_EMAIL_SUCCESS:
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: "",
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage:
          typeof payload === "string" ? payload : "Authentication failed",
      });
    case AUTH_INIT_SUCCESS: {
      const parsed = userSchema
        .nullable()
        .safeParse(
          typeof payload === "object" &&
            payload !== null &&
            "currentUser" in payload
            ? payload.currentUser
            : null,
        );
      return Object.assign({}, state, {
        currentUser: parsed.success ? parsed.data : null,
        loadingInit: false,
      });
    }
    case AUTH_INIT_ERROR:
      return Object.assign({}, state, {
        currentUser: null,
        loadingInit: false,
      });
    default:
      return state;
  }
}
