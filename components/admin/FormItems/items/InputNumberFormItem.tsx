import React, {
  Component,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

export interface InputNumberFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string | undefined;
  autoFocus?: boolean | undefined;
  autoComplete?: string | undefined;
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
}

interface BoundInputNumberFormItemProps extends InputNumberFormItemProps {
  form: FormikProps<FormRecord>;
}

export class InputNumberFormItemNotFast extends Component<BoundInputNumberFormItemProps> {
  override render() {
    const {
      name,
      form,
      hint,
      size,
      type,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      errorMessage,
      required,
    } = this.props;

    const { label } = this.props.schema[name] ?? {};

    const sizeLabelClassName = size
      ? {
          small: "col-new-label-sm",
          large: "col-new-label-lg",
        }[size] || ""
      : "";

    const sizeInputClassName = size
      ? {
          small: "new-control-sm",
          large: "new-control-lg",
        }[size] || ""
      : "";

    return (
      <div className="form-group">
        {!!label && (
          <label
            className={`col-form-label ${
              required ? "required" : null
            } ${sizeLabelClassName}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <input
          id={name}
          type={type ?? "number"}
          onChange={(event) => {
            form.setFieldValue(name, event.target.value);
            form.setFieldTouched(name);
          }}
          value={
            typeof form.values[name] === "number" ||
            typeof form.values[name] === "string"
              ? form.values[name]
              : ""
          }
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          className={`form-control ${sizeInputClassName} ${FormErrors.validateStatus(
            form,
            name,
            errorMessage,
          )}`}
          {...inputProps}
        />
        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>
        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class InputNumberFormItem extends Component<InputNumberFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <InputNumberFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default InputNumberFormItem;
