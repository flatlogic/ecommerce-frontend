import type {
  EntityId,
  EntityValues,
  LegacyDispatch,
  LegacyGetState,
} from "redux/legacyTypes";
import axios from "axios";
import Errors from "../../../components/admin/FormItems/error/errors";
import { push } from "components/compat/router";
import { doInit } from "@/redux/actions/auth";
import { toast } from "react-toastify";

const actions = {
  doNew: () => {
    return {
      type: "FEEDBACK_FORM_RESET",
    };
  },

  doFind: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "FEEDBACK_FORM_FIND_STARTED",
      });

      const response = await axios.get(`/feedback/${id}`);
      dispatch({
        type: "FEEDBACK_FORM_FIND_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "FEEDBACK_FORM_FIND_ERROR",
      });

      dispatch(push("/admin/feedback"));
    }
  },

  doCreate: (values: EntityValues) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "FEEDBACK_FORM_CREATE_STARTED",
      });

      await axios.post("/feedback", { data: values });
      dispatch({
        type: "FEEDBACK_FORM_CREATE_SUCCESS",
      });

      toast.success("Feedback created");
      dispatch(push("/admin/feedback"));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "FEEDBACK_FORM_CREATE_ERROR",
      });
    }
  },

  doUpdate:
    (id: EntityId, values: EntityValues, isProfile: boolean) =>
    async (dispatch: LegacyDispatch, _getState: LegacyGetState) => {
      try {
        dispatch({
          type: "FEEDBACK_FORM_UPDATE_STARTED",
        });

        await axios.put(`/feedback/${id}`, { id, data: values });

        dispatch(doInit());

        dispatch({
          type: "FEEDBACK_FORM_UPDATE_SUCCESS",
        });

        if (isProfile) {
          toast.success("Profile updated");
        } else {
          toast.success("Feedback updated");
          dispatch(push("/admin/feedback"));
        }
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "FEEDBACK_FORM_UPDATE_ERROR",
        });
      }
    },
};

export default actions;
