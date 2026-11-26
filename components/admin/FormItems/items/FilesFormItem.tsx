import React, { Component } from "react";
import FilesUploader, {
  type FilesUploaderProps,
} from "components/admin/FormItems/uploaders/FilesUploader";
import type {
  UploadedFile,
  UploadSchema,
} from "components/admin/FormItems/uploaders/UploadService";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import type { FormFields, FormRecord } from "types/forms";

interface FilesFormItemProps {
  name: string;
  schema: FormFields;
  path: string;
  fileProps: UploadSchema;
  max?: number | undefined;
  inputProps?: Pick<FilesUploaderProps, "readonly"> | undefined;
  required?: boolean | undefined;
  hint?: React.ReactNode;
}

interface BoundFilesFormItemProps extends FilesFormItemProps {
  form: FormikProps<FormRecord>;
}

class FilesFormItemNotFast extends Component<BoundFilesFormItemProps> {
  override render() {
    const { name, form, hint, path, fileProps, max, inputProps, required } =
      this.props;

    const { label } = this.props.schema[name] ?? {};

    return (
      <div className="form-group">
        {!!label && (
          <label
            className={`col-form-label ${required ? "required" : null}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <br />

        <FilesUploader
          path={path}
          schema={fileProps}
          value={form.values[name] as UploadedFile | UploadedFile[] | undefined}
          onChange={(value) => {
            form.setFieldValue(name, value);
            form.setFieldTouched(name);
          }}
          max={max}
          {...inputProps}
        />

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name)}
        </div>
        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class FilesFormItem extends Component<FilesFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <FilesFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default FilesFormItem;
