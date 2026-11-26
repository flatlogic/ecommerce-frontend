import moment from "components/compat/dayjs";
import type { FormFields, FormRecord } from "types/forms";

const asDateInput = (value: unknown): string | number | Date | undefined =>
  typeof value === "string" ||
  typeof value === "number" ||
  value instanceof Date
    ? value
    : undefined;

const relationId = (value: unknown): unknown =>
  typeof value === "object" && value !== null && "id" in value
    ? value.id
    : value;

const PreparedValues = (fields: FormFields, record: FormRecord = {}) => {
  const preparedArray: FormRecord = {};
  Object.keys(fields).forEach((field) => {
    const definition = fields[field];
    if (!definition) return;
    const type = definition.type;
    const value = record[field];
    let preparedValue: unknown = "";
    switch (type) {
      case "date":
        preparedValue = value
          ? moment(asDateInput(value), "YYYY-MM-DD").toDate()
          : null;
        break;

      case "user_many":
      case "relation_many":
        if (!Array.isArray(value) || !value.length) {
          preparedValue = [];
        } else {
          preparedValue = value.map(relationId);
        }
        break;

      case "user_one":
      case "relation_one":
        preparedValue = value ? relationId(value) : null;
        break;

      default:
        preparedValue = value;
    }
    preparedArray[field] = preparedValue;
  });
  return preparedArray;
};

export default PreparedValues;
