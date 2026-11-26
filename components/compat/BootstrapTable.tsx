"use client";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

type Row = Record<string, unknown>;
interface ColumnProps {
  children?: ReactNode;
  dataField: string;
  dataFormat?: (cell: unknown, row: Row) => ReactNode;
  dataSort?: boolean;
  isKey?: boolean;
}
interface TableProps {
  children?: ReactNode;
  data?: Row[];
  options?: { sizePerPage?: number; paginationSize?: number };
  pagination?: boolean;
  search?: boolean;
  tableContainerClass?: string;
}

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Row>();

export function TableHeaderColumn(props: ColumnProps) {
  void props;
  return null;
}

export function BootstrapTable({
  children,
  data = [],
  options,
  pagination,
  search,
  tableContainerClass,
}: TableProps) {
  const columns = useMemo(
    () =>
      Children.toArray(children).filter(
        (child): child is ReactElement<ColumnProps> =>
          isValidElement<ColumnProps>(child),
      ),
    [children],
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{
    field: string;
    descending: boolean;
  } | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(options?.sizePerPage ?? 10);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const rows = normalized
      ? data.filter((row) =>
          Object.values(row).some((value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(normalized),
          ),
        )
      : [...data];
    if (sort)
      rows.sort(
        (left, right) =>
          String(left[sort.field] ?? "").localeCompare(
            String(right[sort.field] ?? ""),
            undefined,
            { numeric: true },
          ) * (sort.descending ? -1 : 1),
      );
    return rows;
  }, [data, query, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRows = pagination
    ? filtered.slice(page * pageSize, page * pageSize + pageSize)
    : filtered;
  const tanstackColumns = useMemo(
    () =>
      columnHelper.columns(
        columns.map((column) => {
          const field = column.props.dataField;
          return columnHelper.accessor((row) => row[field], {
            id: field,
            header: () =>
              column.props.dataSort ? (
                <button
                  type="button"
                  className="btn btn-link p-0 text-reset"
                  onClick={() =>
                    setSort((current) => ({
                      field,
                      descending:
                        current?.field === field ? !current.descending : false,
                    }))
                  }
                >
                  {column.props.children}
                </button>
              ) : (
                column.props.children
              ),
            cell: (info) =>
              column.props.dataFormat
                ? column.props.dataFormat(info.getValue(), info.row.original)
                : String(info.getValue() ?? ""),
          });
        }),
      ),
    [columns],
  );
  const table = useTable({
    features,
    columns: tanstackColumns,
    data: visibleRows,
  });

  return (
    <div className={tableContainerClass}>
      {search && (
        <input
          className="form-control my-3"
          type="search"
          placeholder="Search"
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setPage(0);
          }}
        />
      )}
      <table className="table table-striped table-hover align-middle">
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={String(
                row.original[
                  columns.find((column) => column.props.isKey)?.props
                    .dataField ?? "id"
                ] ?? row.id,
              )}
            >
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="d-flex align-items-center justify-content-between gap-3">
          <label className="d-flex align-items-center gap-2">
            Rows{" "}
            <select
              className="form-select"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.currentTarget.value));
                setPage(0);
              }}
            >
              {[10, 25, 50].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>
          <nav aria-label="Table pages">
            <ul className="pagination mb-0">
              {Array.from(
                { length: Math.min(pageCount, options?.paginationSize ?? 5) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${index === page ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setPage(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
