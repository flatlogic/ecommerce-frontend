import moment from "components/compat/dayjs";
import { isString } from "lodash";
import type { FormFields, FormRecord } from "types/forms";

const asDateInput = (value: unknown): string | number | Date | undefined =>
  typeof value === "string" ||
  typeof value === "number" ||
  value instanceof Date
    ? value
    : undefined;

const IniValues = (fields: FormFields, record: FormRecord = {}) => {
  const iniArray: FormRecord = {};
  Object.keys(fields).forEach((field) => {
    const definition = fields[field];
    if (!definition) return;
    const type = definition.type;
    const value = record[field];
    let showValue: unknown = "";
    switch (type) {
      case "boolean":
        showValue = value;
        break;

      case "date":
        showValue = value
          ? moment(asDateInput(value), "YYYY-MM-DD").toDate()
          : null;
        break;

      case "dateRange":
        if (!Array.isArray(value) || !value.length) {
          showValue = [];
        } else {
          showValue = value.map((item: unknown) =>
            item ? moment(asDateInput(item), "YYYY-MM-DD").toDate() : null,
          );
        }
        break;

      case "datetime":
        showValue = value ? moment(asDateInput(value)).toDate() : null;
        break;

      case "datetimeRange":
        if (!Array.isArray(value) || !value.length) {
          showValue = [];
        } else {
          showValue = value.map((item: unknown) =>
            item ? moment(asDateInput(item)).toDate() : null,
          );
        }
        break;

      case "decimal":
        showValue = value;
        break;

      case "decimalRange":
        showValue = value || [];
        break;

      case "enum":
        if (!value || isString(value)) {
          showValue = value;
        } else {
          showValue =
            typeof value === "object" && value !== null && "id" in value
              ? value.id
              : value;
        }
        break;

      case "files":
        showValue = value;
        break;

      case "images":
        showValue = value;
        break;

      case "int":
        showValue = value;
        break;

      case "intRange":
        showValue = value;
        break;

      case "relation_many":
        showValue = value;
        break;

      case "relation_one":
        showValue = value;
        break;

      case "user_many":
        showValue = value;
        break;

      case "user_one":
        showValue = value;
        break;

      case "stringArray":
        if (!value) {
          showValue = [];
        } else if (Array.isArray(value)) {
          showValue = value;
        } else {
          showValue = [value];
        }
        break;

      case "string":
        showValue = value;
        break;

      default:
        showValue = value;
    }
    iniArray[field] = showValue;
  });
  return iniArray;
};

export default IniValues;
