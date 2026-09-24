import moment from "components/compat/dayjs";
import * as yup from "yup";
import type { FormFields, FormRecord } from "types/forms";

const formValidations = (fields: FormFields, _record: FormRecord = {}) => {
  const yupArray: Record<string, yup.AnySchema> = {};
  Object.keys(fields).forEach((field) => {
    const definition = fields[field];
    if (!definition) return;
    const type = definition.type;
    const label = definition.label;
    const required = definition.required;
    let yupConds: yup.AnySchema;
    switch (type) {
      case "boolean":
        yupConds = yup.bool().default(false);
        break;

      case "date":
        yupConds = yup
          .mixed()
          .nullable()
          .test("is-date", "", (value) => {
            if (!value) {
              return true;
            }
            return (
              (typeof value === "string" ||
                typeof value === "number" ||
                value instanceof Date) &&
              moment(value, "YYYY-MM-DD").isValid()
            );
          });
        break;

      case "datetime":
        yupConds = yup.mixed().nullable();
        break;

      case "decimal":
        yupConds = yup.number().nullable();
        break;

      case "enum":
        yupConds = yup.string().nullable();
        break;

      case "files":
        yupConds = yup.array().compact().ensure().nullable();
        break;

      case "images":
        yupConds = yup.array().nullable();
        break;

      case "int":
        yupConds = yup.number().integer().nullable();
        break;

      case "user_many":
      case "relation_many":
        yupConds = yup.array().nullable();
        break;

      case "user_one":
      case "relation_one":
        yupConds = yup.mixed().nullable();
        break;

      case "stringArray":
        yupConds = yup.array().compact().ensure().of(yup.string().trim());
        break;

      case "string":
        yupConds = yup.string().nullable().trim();
        break;

      default:
        yupConds = yup.string();
    }
    yupConds = yupConds.label(label ?? field);
    if (required) {
      yupConds = yupConds.required();
    }
    yupArray[field] = yupConds;
  });
  return yup.object().shape(yupArray);
};

export default formValidations;
