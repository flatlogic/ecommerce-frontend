import React, {
  Component,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

export interface TextAreaFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
  autoFocus?: boolean | undefined;
  autoComplete?: string | undefined;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement> | undefined;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
}

interface BoundTextAreaFormItemProps extends TextAreaFormItemProps {
  form: FormikProps<FormRecord>;
}

export class TextAreaFormItemNotFast extends Component<BoundTextAreaFormItemProps> {
  override render() {
    const {
      name,
      form,
      hint,
      size,
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
        <textarea
          id={name}
          onChange={(event) => {
            form.setFieldValue(name, event.target.value);
            form.setFieldTouched(name);
          }}
          value={form.values[name] == null ? "" : String(form.values[name])}
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

class TextAreaFormItem extends Component<TextAreaFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <TextAreaFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default TextAreaFormItem;
