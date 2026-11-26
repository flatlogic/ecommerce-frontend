import React, {
  Component,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

export interface InputFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  password?: boolean | undefined;
  placeholder?: string | undefined;
  autoFocus?: boolean | undefined;
  autoComplete?: string | undefined;
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
}

interface BoundInputFormItemProps extends InputFormItemProps {
  form: FormikProps<FormRecord>;
}

const inputValue = (value: unknown): string | number | readonly string[] =>
  typeof value === "string" || typeof value === "number" || Array.isArray(value)
    ? (value as string | number | readonly string[])
    : "";

export class InputFormItemNotFast extends Component<BoundInputFormItemProps> {
  override render() {
    const {
      name,
      form,
      hint,
      size,
      password,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      errorMessage,
      required,
      disabled,
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
          type={password ? "password" : "text"}
          onChange={(event) => {
            form.setFieldValue(name, event.target.value);
            form.setFieldTouched(name);
          }}
          disabled={disabled}
          value={inputValue(form.values[name])}
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

class InputFormItem extends Component<InputFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <InputFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default InputFormItem;
