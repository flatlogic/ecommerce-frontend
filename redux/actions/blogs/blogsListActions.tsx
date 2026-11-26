import type {
  EntityId,
  LegacyDispatch,
  LegacyGetState,
  ListFilter,
} from "redux/legacyTypes";
import Errors from "components/admin/FormItems/error/errors";
import axios from "axios";

async function list() {
  const response = await axios.get(`/blogs`);
  return response.data;
}

const actions = {
  doAdd: (product: unknown) => async (dispatch: LegacyDispatch) => {
    dispatch({
      type: "BLOGS_LIST_DO_ADD",
      payload: { product },
    });
  },

  doFetch:
    (filter: ListFilter, keepPagination = false) =>
    async (dispatch: LegacyDispatch, _getState: LegacyGetState) => {
      try {
        dispatch({
          type: "BLOGS_LIST_FETCH_STARTED",
          payload: { filter, keepPagination },
        });

        const response = await list();

        dispatch({
          type: "BLOGS_LIST_FETCH_SUCCESS",
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "BLOGS_LIST_FETCH_ERROR",
        });
      }
    },

  doDelete: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    try {
      dispatch({
        type: "BLOGS_LIST_DELETE_STARTED",
      });

      await axios.delete(`/blogs/${id}`);

      dispatch({
        type: "BLOGS_LIST_DELETE_SUCCESS",
      });

      const response = await list();
      dispatch({
        type: "BLOGS_LIST_FETCH_SUCCESS",
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "BLOGS_LIST_DELETE_ERROR",
      });
    }
  },
  doOpenConfirm: (id: EntityId) => async (dispatch: LegacyDispatch) => {
    dispatch({
      type: "BLOGS_LIST_OPEN_CONFIRM",
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch: LegacyDispatch) => {
    dispatch({
      type: "BLOGS_LIST_CLOSE_CONFIRM",
    });
  },
};

export default actions;
