import React, {
  Component,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

export interface SwitchFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
}

interface BoundSwitchFormItemProps extends SwitchFormItemProps {
  form: FormikProps<FormRecord>;
}

export class SwitchFormItemNotFast extends Component<BoundSwitchFormItemProps> {
  override render() {
    const { name, form, hint, size, inputProps, errorMessage, required } =
      this.props;

    const { label } = this.props.schema[name] ?? {};

    const sizeLabelClassName = size
      ? {
          small: "col-new-label-sm",
          large: "col-new-label-lg",
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

        <div>
          <input
            type="checkbox"
            id={name}
            name={name}
            onChange={(event) => {
              form.setFieldValue(name, event.target.checked);
              form.setFieldTouched(name);
            }}
            checked={!!form.values[name]}
            {...inputProps}
          />

          <label htmlFor={name}>&#160;</label>
        </div>

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>

        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class SwitchFormItem extends Component<SwitchFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <SwitchFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default SwitchFormItem;
