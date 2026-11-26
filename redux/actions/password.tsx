import axios from "axios";
import Errors from "../../components/admin/FormItems/error/errors";
import { toast } from "react-toastify";
import { redirectTo } from "./redirect";
import type { LegacyDispatch } from "redux/legacyTypes";

interface PasswordChange {
  newPassword: string;
  currentPassword: string;
}

const actions = {
  doChangePassword:
    ({ newPassword, currentPassword }: PasswordChange) =>
    async (dispatch: LegacyDispatch) => {
      try {
        dispatch({
          type: "USERS_FORM_CREATE_STARTED",
        });
        await axios.put("/auth/password-update", {
          newPassword,
          currentPassword,
        });
        dispatch({
          type: "USERS_FORM_UPDATE_SUCCESS",
        });

        toast.success("Password has been updated");
        redirectTo("/admin/dashboard");
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "USERS_FORM_CREATE_ERROR",
        });
      }
    },
};

export default actions;
