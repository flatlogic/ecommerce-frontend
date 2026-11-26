import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import SwitchFormItem from "components/admin/FormItems/items/SwitchFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import usersFields from "components/admin/CRUD/Users/usersFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import ProductsAutocompleteFormItem from "components/admin/CRUD/Products/autocomplete/ProductsAutocompleteFormItem";
import type { FormRecord } from "types/forms";

export interface UserFormProps {
  currentUser?: unknown;
  findLoading: boolean;
  isEditing: boolean;
  isProfile: boolean;
  modal?: boolean;
  onCancel: () => void;
  onSubmit: (id: string, data: FormRecord) => void;
  record: FormRecord | null;
  saveLoading: boolean;
  showActions?: boolean;
}

export default function UsersForm({
  findLoading,
  isEditing,
  isProfile,
  modal = false,
  onCancel,
  onSubmit,
  record,
  saveLoading,
  showActions = true,
}: UserFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit users"
      : "Add users";
  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(usersFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(usersFields, record ?? {})}
        validationSchema={
          showActions ? FormValidations(usersFields, record ?? {}) : undefined
        }
      >
        {(form) => (
          <form
            onSubmit={
              showActions
                ? form.handleSubmit
                : (event) => event.preventDefault()
            }
          >
            <ProductsAutocompleteFormItem
              name="wishlist"
              schema={usersFields}
              showCreate={!modal}
              mode="multiple"
            />
            <InputFormItem name="firstName" schema={usersFields} />
            <InputFormItem name="lastName" schema={usersFields} />
            <InputFormItem name="phoneNumber" schema={usersFields} />
            <InputFormItem name="email" schema={usersFields} />
            <RadioFormItem name="role" schema={usersFields} />
            <SwitchFormItem name="disabled" schema={usersFields} />
            <ImagesFormItem
              name="avatar"
              schema={usersFields}
              path="users/avatar"
              fileProps={{}}
            />
            {showActions && (
              <div className="form-buttons">
                <button
                  className="btn btn-primary"
                  disabled={saveLoading}
                  type="submit"
                >
                  Save
                </button>{" "}
                <button
                  className="btn btn-light"
                  type="button"
                  disabled={saveLoading}
                  onClick={form.handleReset}
                >
                  Reset
                </button>{" "}
                <button
                  className="btn btn-light"
                  type="button"
                  disabled={saveLoading}
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </Widget>
  );
}
