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
      type: "ORDERS_FORM_RESET",
    };
  },

  doFind: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "ORDERS_FORM_FIND_STARTED",
      });

      const response = await axios.get(`/orders/${id}`);
      dispatch({
        type: "ORDERS_FORM_FIND_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "ORDERS_FORM_FIND_ERROR",
      });

      redirectTo("/admin/orders");
    }
  },

  doCreate: (values: EntityValues) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "ORDERS_FORM_CREATE_STARTED",
      });

      await axios.post("/orders", { data: values });
      dispatch({
        type: "ORDERS_FORM_CREATE_SUCCESS",
      });

      toast.success("orders created");
      redirectTo("/admin/orders");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "ORDERS_FORM_CREATE_ERROR",
      });
    }
  },

  doUpdate:
    (id: EntityId, values: EntityValues, isProfile: boolean) =>
    async (dispatch: LegacyDispatch, _getState: LegacyGetState) => {
      try {
        dispatch({
          type: "ORDERS_FORM_UPDATE_STARTED",
        });

        await axios.put(`/orders/${id}`, { id, data: values });

        dispatch(doInit());

        dispatch({
          type: "ORDERS_FORM_UPDATE_SUCCESS",
        });

        if (isProfile) {
          toast.success("Profile updated");
        } else {
          toast.success("orders updated");
          redirectTo("/admin/orders");
        }
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "ORDERS_FORM_UPDATE_ERROR",
        });
      }
    },
};

export default actions;
