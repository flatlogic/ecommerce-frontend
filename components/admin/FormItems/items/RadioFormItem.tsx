import React, { Component, type ReactNode } from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

export interface RadioFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
}

interface BoundRadioFormItemProps extends RadioFormItemProps {
  form: FormikProps<FormRecord>;
}

class RadioFormItemNotFast extends Component<BoundRadioFormItemProps> {
  override render() {
    const { name, form, hint, errorMessage, required } = this.props;

    const { label, options = [] } = this.props.schema[name] ?? {};

    return (
      <div className="form-group">
        {!!label && (
          <label className={`col-form-label ${required ? "required" : null}`}>
            {label}
          </label>
        )}

        <br />

        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              className={`form-check-input ${FormErrors.validateStatus(
                form,
                name,
                errorMessage,
              )}`}
              type="radio"
              id={`${name}-${option.value}`}
              name={`${name}-${option.value}`}
              value={option.value}
              checked={option.value === form.values[name]}
              onChange={(e) => {
                form.setFieldValue(name, e.target.value);
                form.setFieldTouched(name);
              }}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="form-check-label"
            >
              {option.label}
            </label>
          </div>
        ))}

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>

        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class RadioFormItem extends Component<RadioFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <RadioFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default RadioFormItem;
