import React, { Component, type ReactNode } from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import { FastField, type FormikProps } from "formik";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import type { FormFields, FormOption, FormRecord } from "types/forms";

export interface SelectFormItemProps {
  name: string;
  schema: FormFields;
  hint?: ReactNode;
  errorMessage?: string | null | undefined;
  required?: boolean | undefined;
  mode?: string | undefined;
  placeholder?: string | undefined;
  isClearable?: boolean | undefined;
}

interface BoundSelectFormItemProps extends SelectFormItemProps {
  form: FormikProps<FormRecord>;
}

class SelectFormItemNotFast extends Component<BoundSelectFormItemProps> {
  value = (): FormOption | null => {
    const { form, name } = this.props;
    const options = this.props.schema[name]?.options ?? [];

    if (form.values[name]) {
      return (
        options.find((option) => option.value === form.values[name]) ?? null
      );
    }
    return null;
  };

  handleSelect = (data: SingleValue<FormOption>) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);

    if (!data) {
      form.setFieldValue(name, undefined);
      return;
    }

    form.setFieldValue(name, data.value);
  };

  override render() {
    const {
      form,
      name,
      hint,
      errorMessage,
      required,
      placeholder,
      isClearable,
    } = this.props;

    const { label, options = [] } = this.props.schema[name] ?? {};

    const isInvalid = !!FormErrors.displayableError(form, name, errorMessage);

    const controlStyles: StylesConfig<FormOption, false> | undefined = isInvalid
      ? {
          control: (provided) => ({
            ...provided,
            borderColor: "red",
          }),
        }
      : undefined;

    return (
      <div className="form-group">
        {!!label && (
          <label className={`col-form-label ${required ? "required" : null}`}>
            {label}
          </label>
        )}

        <br />

        <Select
          className="w-100"
          value={this.value()}
          onChange={this.handleSelect}
          id={name}
          name={name}
          options={options}
          isMulti={false}
          placeholder={placeholder || ""}
          isClearable={isClearable ?? true}
          styles={controlStyles}
          loadingMessage={() => "Loading"}
          noOptionsMessage={() => "No options"}
        />

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>

        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class SelectFormItem extends Component<SelectFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <SelectFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default SelectFormItem;
