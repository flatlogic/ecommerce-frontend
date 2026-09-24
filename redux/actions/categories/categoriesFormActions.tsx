import type {
  EntityId,
  EntityValues,
  LegacyDispatch,
  LegacyGetState,
} from "redux/legacyTypes";
import axios from "axios";
import Errors from "../../../components/admin/FormItems/error/errors";
import { doInit } from "@/redux/actions/auth";
import { toast } from "react-toastify";
import { redirectTo } from "../redirect";

const actions = {
  doNew: () => {
    return {
      type: "CATEGORIES_FORM_RESET",
    };
  },

  doFind: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "CATEGORIES_FORM_FIND_STARTED",
      });

      const response = await axios.get(`/categories/${id}`);
      dispatch({
        type: "CATEGORIES_FORM_FIND_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "CATEGORIES_FORM_FIND_ERROR",
      });

      redirectTo("/admin/categories");
    }
  },

  doCreate: (values: EntityValues) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "CATEGORIES_FORM_CREATE_STARTED",
      });

      await axios.post("/categories", { data: values });
      dispatch({
        type: "CATEGORIES_FORM_CREATE_SUCCESS",
      });

      toast.success("сategories created");
      redirectTo("/admin/categories");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "CATEGORIES_FORM_CREATE_ERROR",
      });
    }
  },

  doUpdate:
    (id: EntityId, values: EntityValues, isProfile: boolean) =>
    async (dispatch: LegacyDispatch, _getState: LegacyGetState) => {
      try {
        dispatch({
          type: "CATEGORIES_FORM_UPDATE_STARTED",
        });

        await axios.put(`/categories/${id}`, { id, data: values });

        dispatch(doInit());

        dispatch({
          type: "CATEGORIES_FORM_UPDATE_SUCCESS",
        });

        if (isProfile) {
          toast.success("Profile updated");
        } else {
          toast.success("сategories updated");
          redirectTo("/admin/categories");
        }
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "CATEGORIES_FORM_UPDATE_ERROR",
        });
      }
    },
};

export default actions;
