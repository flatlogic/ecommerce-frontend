import { useEffect } from "react";
import actions from "@/redux/actions/blogs/blogsListActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { LegacyDispatch } from "@/redux/legacyTypes";
import Link from "components/compat/Link";
import { useRouter } from "components/compat/router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "components/compat/bootstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
} from "components/compat/BootstrapTable";
import Widget from "components/admin/Widget";
import { imageFormatter } from "./BlogsDataFormatters";

const isRow = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
export default function BlogsListTable() {
  const dispatch = useAppDispatch() as unknown as LegacyDispatch;
  const router = useRouter();
  const listState = useAppSelector((state) => state.blogs.list);
  const rows: Record<string, unknown>[] = Array.isArray(listState.rows)
    ? (listState.rows.filter(isRow) as Record<string, unknown>[])
    : [];
  const modalOpen = "modalOpen" in listState && listState.modalOpen === true;
  const idToDelete =
    "idToDelete" in listState ? String(listState.idToDelete ?? "") : "";
  useEffect(() => {
    dispatch(actions.doFetch({}));
  }, [dispatch]);
  const closeModal = () => dispatch(actions.doCloseConfirm());
  return (
    <div>
      <Widget title={<h4>Blogs</h4>} collapse close>
        <Link href="/admin/blogs/new">
          <button className="btn btn-primary" type="button">
            New
          </button>
        </Link>
        <BootstrapTable
          data={rows}
          pagination
          options={{ sizePerPage: 10, paginationSize: 5 }}
          search
          tableContainerClass="table-responsive table-striped table-hover"
        >
          <TableHeaderColumn
            dataField="hero_image"
            dataSort
            dataFormat={imageFormatter}
          >
            <span className="fs-sm">Image</span>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort>
            <span className="fs-sm">Title</span>
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="author_avatar"
            dataSort
            dataFormat={imageFormatter}
          >
            <span className="fs-sm">Author avatar</span>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="author_name" dataSort>
            <span className="fs-sm">Author name</span>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort>
            <span className="fs-sm">Status</span>
          </TableHeaderColumn>
          <TableHeaderColumn
            isKey
            dataField="id"
            dataFormat={(cell) => {
              const id = String(cell ?? "");
              return (
                <div>
                  <Button
                    color="default"
                    size="xs"
                    onClick={() => router.push(`/admin/blogs/${id}`)}
                  >
                    View
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    color="info"
                    size="xs"
                    onClick={() => router.push(`/admin/blogs/edit/${id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    color="danger"
                    size="xs"
                    onClick={() => dispatch(actions.doOpenConfirm(id))}
                  >
                    Delete
                  </Button>
                </div>
              );
            }}
          >
            <span className="fs-sm">Actions</span>
          </TableHeaderColumn>
        </BootstrapTable>
      </Widget>
      <Modal size="sm" isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Confirm delete</ModalHeader>
        <ModalBody className="bg-white">
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => dispatch(actions.doDelete(idToDelete))}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
