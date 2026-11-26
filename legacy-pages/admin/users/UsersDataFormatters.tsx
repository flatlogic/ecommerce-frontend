export {
  booleanFormatter,
  imageFormatter,
  dateTimeFormatter,
  filesFormatter,
} from "../categories/CategoriesDataFormatters";

interface UserReference {
  id: string;
  email?: string;
}
export function listFormatter(cell: unknown) {
  const values: UserReference[] = Array.isArray(cell)
    ? cell.filter(
        (value): value is UserReference =>
          typeof value === "object" && value !== null && "id" in value,
      )
    : typeof cell === "object" && cell !== null && "id" in cell
      ? [cell as UserReference]
      : [];
  return values.length ? (
    <div>
      {values.map((value) => (
        <div key={value.id}>
          <a href={value.id}>{value.email}</a>
        </div>
      ))}
    </div>
  ) : null;
}
export default function UsersDataFormatters() {
  return null;
}
