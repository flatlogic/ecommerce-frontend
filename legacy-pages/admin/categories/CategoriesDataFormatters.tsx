import LegacyIcon from "components/compat/LegacyIcon";
import moment from "components/compat/dayjs";
import { truncate } from "lodash";

interface MediaItem {
  id: string;
  name?: string;
  publicUrl?: string;
  title?: string;
}

const asItems = (value: unknown): MediaItem[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is MediaItem =>
          typeof item === "object" && item !== null && "id" in item,
      )
    : [];

export function imageFormatter(cell: unknown) {
  const imageUrl = asItems(cell)[0]?.publicUrl;
  return imageUrl ? (
    <img
      width="60"
      height="60"
      className="rounded-circle"
      src={imageUrl}
      alt="avatar"
    />
  ) : null;
}

export function booleanFormatter(cell: unknown) {
  return cell ? "Yes" : "No";
}

export function dateTimeFormatter(cell: unknown) {
  return typeof cell === "string" ||
    typeof cell === "number" ||
    cell instanceof Date
    ? moment(cell).format("YYYY-MM-DD HH:mm")
    : null;
}

export function filesFormatter(cell: unknown) {
  return (
    <div>
      {asItems(cell).map((value) => (
        <div key={value.id}>
          <LegacyIcon className="la la-link text-muted mr-2" />
          <a
            href={value.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {truncate(value.name ?? "")}
          </a>
        </div>
      ))}
    </div>
  );
}

export function listFormatter(cell: unknown) {
  const items = asItems(cell);
  if (
    !items.length &&
    (typeof cell !== "object" || cell === null || !("id" in cell))
  )
    return null;
  const values = items.length ? items : [cell as MediaItem];
  return (
    <div>
      {values.map((value) => (
        <div key={value.id}>
          <a href={value.id}>{value.title}</a>
        </div>
      ))}
    </div>
  );
}

export default function CategoriesDataFormatters() {
  return null;
}
