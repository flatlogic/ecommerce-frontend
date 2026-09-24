import type {
  EntityId,
  LegacyDispatch,
  LegacyGetState,
  ListFilter,
} from "redux/legacyTypes";
import Errors from "../../../components/admin/FormItems/error/errors";
import axios from "axios";

async function list() {
  const response = await axios.get(`/users`);
  return response.data;
}

const actions = {
  doFetch:
    (filter: ListFilter, keepPagination = false) =>
    async (dispatch: LegacyDispatch, _getState: LegacyGetState) => {
      try {
        dispatch({
          type: "USERS_LIST_FETCH_STARTED",
          payload: { filter, keepPagination },
        });

        const response = await list();

        dispatch({
          type: "USERS_LIST_FETCH_SUCCESS",
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "USERS_LIST_FETCH_ERROR",
        });
      }
    },

  doDelete: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "USERS_LIST_DELETE_STARTED",
      });

      await axios.delete(`/users/${id}`);

      dispatch({
        type: "USERS_LIST_DELETE_SUCCESS",
      });

      const response = await list();
      dispatch({
        type: "USERS_LIST_FETCH_SUCCESS",
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "USERS_LIST_DELETE_ERROR",
      });
    }
  },
  doOpenConfirm: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    dispatch({
      type: "USERS_LIST_OPEN_CONFIRM",
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch: LegacyDispatch) => {
    dispatch({
      type: "USERS_LIST_CLOSE_CONFIRM",
    });
  },
};

export default actions;
