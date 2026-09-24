import { FastField, type FormikProps } from "formik";
import React, { Component, type ReactNode } from "react";
import FormErrors from "components/admin/FormItems/formErrors";
import AsyncSelect from "react-select/async";
import type { MultiValue, SingleValue, StylesConfig } from "react-select";
import type { FormFields, FormRecord } from "types/forms";

const AUTOCOMPLETE_SERVER_FETCH_SIZE = 100;

export interface AutocompleteOption {
  key?: string;
  value: string;
  label: string;
}

export interface AutocompleteMapper {
  toAutocomplete: (value: unknown) => AutocompleteOption | undefined;
  toValue: (value: AutocompleteOption) => unknown;
}

export interface AutocompleteFormItemProps {
  name: string;
  schema: FormFields;
  fetchFn: (query: string, limit: number) => Promise<unknown[]>;
  mapper: AutocompleteMapper;
  hint?: ReactNode;
  size?: "small" | "large" | undefined;
  placeholder?: string | undefined;
  autoFocus?: boolean | undefined;
  inputProps?: { isDisabled?: boolean } | undefined;
  errorMessage?: string | null | undefined;
  mode?: "default" | "multiple" | undefined;
  required?: boolean | undefined;
  isClearable?: boolean | undefined;
  showCreate?: boolean | undefined;
  hasPermissionToCreate?: boolean | undefined;
}

interface BoundAutocompleteFormItemProps extends AutocompleteFormItemProps {
  form: FormikProps<FormRecord>;
}

class AutocompleteFormItemNotFast extends Component<BoundAutocompleteFormItemProps> {
  value = (): AutocompleteOption | AutocompleteOption[] | null => {
    const { mode } = this.props;
    if (mode === "multiple") {
      return this.valueMultiple();
    } else {
      return this.valueOne();
    }
  };

  valueMultiple = (): AutocompleteOption[] => {
    const { form, name, mapper } = this.props;

    if (Array.isArray(form.values[name])) {
      return form.values[name]
        .map((value) => mapper.toAutocomplete(value))
        .filter((value): value is AutocompleteOption => Boolean(value));
    }

    return [];
  };

  valueOne = (): AutocompleteOption | null => {
    const { form, name, mapper } = this.props;

    if (form.values[name]) {
      return mapper.toAutocomplete(form.values[name]) ?? null;
    }

    return null;
  };

  handleSelect = (
    value: MultiValue<AutocompleteOption> | SingleValue<AutocompleteOption>,
  ) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);

    const { mode } = this.props;
    if (mode === "multiple") {
      return this.handleSelectMultiple(Array.isArray(value) ? value : []);
    } else {
      const selected = Array.isArray(value)
        ? null
        : (value as SingleValue<AutocompleteOption>);
      return this.handleSelectOne(selected);
    }
  };

  handleSelectMultiple = (values: readonly AutocompleteOption[]) => {
    const { form, name, mapper } = this.props;

    if (!values) {
      form.setFieldValue(name, []);
      return;
    }

    form.setFieldValue(
      name,
      values.map((value) => mapper.toValue(value)),
    );
  };

  handleSelectOne = (value: AutocompleteOption | null) => {
    const { form, name, mapper } = this.props;

    if (!value) {
      form.setFieldValue(name, "");
      return;
    }

    form.setFieldValue(name, mapper.toValue(value));
  };

  handleSearch = async (value: string): Promise<AutocompleteOption[]> => {
    const { fetchFn, mapper } = this.props;

    try {
      const results = await fetchFn(value, AUTOCOMPLETE_SERVER_FETCH_SIZE);

      return results
        .map((result) => mapper.toAutocomplete(result))
        .filter((result): result is AutocompleteOption => Boolean(result));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  override render() {
    const {
      form,
      name,
      hint,
      size,
      placeholder,
      autoFocus,
      inputProps,
      errorMessage,
      mode,
      required,
      isClearable,
    } = this.props;

    const { label } = this.props.schema[name] ?? {};

    const sizeLabelClassName = size
      ? {
          small: "col-new-label-sm",
          large: "col-new-label-lg",
        }[size] || ""
      : "";

    const isInvalid = !!FormErrors.displayableError(form, name, errorMessage);

    const controlStyles: StylesConfig<AutocompleteOption, boolean> | undefined =
      isInvalid
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
          <label
            className={`col-form-label ${
              required ? "required" : null
            } ${sizeLabelClassName}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <div style={{ display: "flex" }}>
          <AsyncSelect<AutocompleteOption, boolean>
            className="w-100"
            {...(controlStyles ? { styles: controlStyles } : {})}
            id={name}
            name={name}
            defaultOptions={true}
            isMulti={mode === "multiple"}
            loadOptions={this.handleSearch}
            placeholder={placeholder || ""}
            {...(autoFocus ? { autoFocus: true } : {})}
            onChange={this.handleSelect}
            value={this.value()}
            isClearable={isClearable ?? true}
            {...inputProps}
          />
        </div>

        <div className="invalid-feedback">
          {FormErrors.displayableError(form, name, errorMessage)}
        </div>
        {!!hint && <small className="form-text text-muted">{hint}</small>}
      </div>
    );
  }
}

class AutocompleteFormItem extends Component<AutocompleteFormItemProps> {
  override render() {
    return (
      <FastField name={this.props.name}>
        {({ form }: { form: FormikProps<FormRecord> }) => (
          <AutocompleteFormItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default AutocompleteFormItem;
