import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputNumberFormItem from "components/admin/FormItems/items/InputNumberFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import ordersFields from "components/admin/CRUD/Orders/ordersFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import ProductsAutocompleteFormItem from "components/admin/CRUD/Products/autocomplete/ProductsAutocompleteFormItem";
import UsersAutocompleteFormItem from "components/admin/CRUD/Users/autocomplete/UsersAutocompleteFormItem";
import type { FormRecord } from "types/forms";
export interface OrderFormProps {
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
export default function OrdersForm({
  findLoading,
  isEditing,
  isProfile,
  modal = false,
  onCancel,
  onSubmit,
  record,
  saveLoading,
  showActions = true,
}: OrderFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit orders"
      : "Add orders";
  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(ordersFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(ordersFields, record ?? {})}
        validationSchema={FormValidations(ordersFields, record ?? {})}
      >
        {(form) => (
          <form
            onSubmit={
              showActions
                ? form.handleSubmit
                : (event) => event.preventDefault()
            }
          >
            <DatePickerFormItem
              name="order_date"
              schema={ordersFields}
              showTimeInput
            />
            <ProductsAutocompleteFormItem
              name="product"
              schema={ordersFields}
              showCreate={!modal}
            />
            <UsersAutocompleteFormItem
              name="user"
              schema={ordersFields}
              showCreate={!modal}
            />
            <InputNumberFormItem name="amount" schema={ordersFields} />
            <RadioFormItem name="status" schema={ordersFields} />
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
