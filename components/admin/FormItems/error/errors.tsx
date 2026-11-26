import { toast } from "react-toastify";
// import { store } from "pages/_app";

const DEFAULT_ERROR_MESSAGE = "Error";

interface ErrorLike {
  message?: string;
  response?: { data?: unknown; status?: number };
}

const toErrorLike = (error: unknown): ErrorLike =>
  typeof error === "object" && error !== null ? (error as ErrorLike) : {};

function selectErrorMessage(error: unknown): string {
  const candidate = toErrorLike(error);
  if (candidate.response?.data) {
    const data = candidate.response.data;

    if (typeof data === "object" && data !== null && "error" in data) {
      const nested = data.error;
      if (typeof nested === "object" && nested !== null && "message" in nested)
        return String(nested.message);
    }

    return String(data);
  }

  return candidate.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error: unknown): number {
  return toErrorLike(error).response?.status ?? 500;
}

export default class Errors {
  static handle(error: unknown) {
    if (process.env.NODE_ENV !== "test") {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      // store.dispatch(push("/403"));
      return;
    }

    if (selectErrorCode(error) === 400) {
      toast.error(selectErrorMessage(error));
      return;
    }

    // store.dispatch(push("/500"));
  }

  static errorCode(error: unknown) {
    return selectErrorCode(error);
  }

  static selectMessage(error: unknown) {
    return selectErrorMessage(error);
  }

  static showMessage(error: unknown) {
    toast.error(selectErrorMessage(error));
  }
}
