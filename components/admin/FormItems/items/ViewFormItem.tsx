import React, { Component, type ReactNode } from "react";
import { FastField, type FormikProps } from "formik";
import type { FormRecord } from "types/forms";

interface ViewFormItemProps {
  label?: ReactNode;
  name: string;
}

interface BoundViewFormItemProps extends ViewFormItemProps {
  form: FormikProps<FormRecord>;
}

class ViewFormItemNotFast extends Component<BoundViewFormItemProps> {
  override render() {
    const { label, name, form } = this.props;

    return (
      <div className="form-group">
        <label className="col-form-label" htmlFor={name}>
          {label}
        </label>
        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          id={name}
          value={form.values[name] == null ? "" : String(form.values[name])}
        />
      </div>
    );
  }
}

class ViewFormItem extends Component<ViewFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <ViewFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default ViewFormItem;
