import React, { Component, type ReactNode } from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { FormFields, FormRecord } from "types/forms";

export interface DatePickerFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  placeholder?: string | undefined;
  autoFocus?: boolean | undefined;
  autoComplete?: string | undefined;
  inputProps?: { disabled?: boolean; readOnly?: boolean } | undefined;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
  showTimeInput?: boolean | undefined;
}

interface BoundDatePickerFormItemProps extends DatePickerFormItemProps {
  form: FormikProps<FormRecord>;
}

export class DatePickerFormItemNotFast extends Component<BoundDatePickerFormItemProps> {
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
      showTimeInput,
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
        )}{" "}
        <br />
        <DatePicker
          id={name}
          className={`form-control ${sizeInputClassName} ${FormErrors.validateStatus(
            form,
            name,
            errorMessage,
          )}`}
          selected={
            form.values[name] instanceof Date ? form.values[name] : null
          }
          onChange={(value: Date | null) => {
            form.setFieldValue(name, value);
            form.setFieldTouched(name);
          }}
          showTimeInput={Boolean(showTimeInput)}
          placeholderText={placeholder || ""}
          {...(autoFocus ? { autoFocus: true } : {})}
          {...(autoComplete ? { autoComplete } : {})}
          dateFormat={showTimeInput ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
          timeIntervals={15}
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

class DatePickerFormItem extends Component<DatePickerFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <DatePickerFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default DatePickerFormItem;
