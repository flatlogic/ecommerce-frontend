import axios from "axios";
import config from "constants/config";
import jwt from "components/compat/jwt";
import { toast } from "react-toastify";
import Errors from "components/admin/FormItems/error/errors";
import type { LegacyDispatch } from "redux/legacyTypes";
import { redirectTo } from "./redirect";

type Credentials =
  | { email: string; password: string; social?: never }
  | { social: string; email?: never; password?: never };

export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const PASSWORD_RESET_EMAIL_REQUEST = "PASSWORD_RESET_EMAIL_REQUEST";
export const PASSWORD_RESET_EMAIL_SUCCESS = "PASSWORD_RESET_EMAIL_SUCCESS";
export const AUTH_INIT_SUCCESS = "AUTH_INIT_SUCCESS";
export const AUTH_INIT_ERROR = "AUTH_INIT_ERROR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

async function findMe() {
  const response = await axios.get("/auth/me");
  return response.data;
}

function errorPayload(error: unknown) {
  return axios.isAxiosError(error)
    ? (error.response?.data ?? error.message)
    : error;
}

export function authError(payload?: unknown) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

export function doInit() {
  return async (dispatch: LegacyDispatch) => {
    try {
      let currentUser = null;
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");
      if (token) {
        currentUser = await findMe();
      }
      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: AUTH_INIT_ERROR,
        payload: error,
      });
    }
  };
}

export function logoutUser() {
  return (dispatch: LegacyDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  };
}

export function receiveToken(token: string) {
  return (dispatch: LegacyDispatch) => {
    const user = jwt.decode(token);

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    dispatch({
      type: LOGIN_SUCCESS,
    });
    redirectTo("/admin/dashboard");
  };
}

export function loginUser(creds: Credentials) {
  return (dispatch: LegacyDispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    if (creds.social) {
      redirectTo(`${config.baseURLApi}/auth/signin/${creds.social}`);
    } else if (
      creds.email &&
      creds.password &&
      creds.email.length > 0 &&
      creds.password.length > 0
    ) {
      axios
        .post("/auth/signin/local", creds)
        .then((res) => {
          const token = res.data;
          dispatch(receiveToken(token));
        })
        .catch((error: unknown) => {
          dispatch(authError(errorPayload(error)));
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}

export function verifyEmail(token: string) {
  return () => {
    axios
      .put("/auth/verify-email", { token })
      .then((verified) => {
        if (verified) {
          toast.success("Your email was verified");
        }
      })
      .catch((error: unknown) => {
        toast.error(String(errorPayload(error)));
      })
      .finally(() => {
        redirectTo("/login");
      });
  };
}

export function resetPassword(token: string, password: string) {
  return (dispatch: LegacyDispatch) => {
    dispatch({
      type: RESET_REQUEST,
    });
    axios
      .put("/auth/password-reset", { token, password })
      .then(() => {
        dispatch({
          type: RESET_SUCCESS,
        });
        toast.success("Password has been updated");
        redirectTo("/login");
      })
      .catch((error: unknown) => {
        dispatch(authError(errorPayload(error)));
      });
  };
}

export function sendPasswordResetEmail(email: string) {
  return (dispatch: LegacyDispatch) => {
    dispatch({
      type: PASSWORD_RESET_EMAIL_REQUEST,
    });
    axios
      .post("/auth/send-password-reset-email", { email })
      .then(() => {
        dispatch({
          type: PASSWORD_RESET_EMAIL_SUCCESS,
        });
        toast.success("Email with resetting instructions has been sent");
        redirectTo("/login");
      })
      .catch((error: unknown) => {
        dispatch(authError(errorPayload(error)));
      });
  };
}

export function registerUser(creds: Credentials) {
  return (dispatch: LegacyDispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    if (
      creds.email &&
      creds.password &&
      creds.email.length > 0 &&
      creds.password.length > 0
    ) {
      axios
        .post("/auth/signup", creds)
        .then(() => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          toast.success(
            "You've been registered successfully. Please check your email for verification link",
          );
          redirectTo("/login");
        })
        .catch((error: unknown) => {
          dispatch(authError(errorPayload(error)));
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}
