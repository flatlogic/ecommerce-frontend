import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import InputNumberFormItem from "components/admin/FormItems/items/InputNumberFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import TextAreaFormItem from "components/admin/FormItems/items/TextAreaFormItem";
import feedbackFields from "components/admin/CRUD/Feedback/feedbackFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import ProductsAutocompleteFormItem from "components/admin/CRUD/Products/autocomplete/ProductsAutocompleteFormItem";
import UsersAutocompleteFormItem from "components/admin/CRUD/Users/autocomplete/UsersAutocompleteFormItem";
import type { FormRecord } from "types/forms";

export interface FeedbackFormProps {
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

export default function FeedbackForm({
  findLoading,
  isEditing,
  isProfile,
  modal = false,
  onCancel,
  onSubmit,
  record,
  saveLoading,
  showActions = true,
}: FeedbackFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit feedback"
      : "Add feedback";

  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(feedbackFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(feedbackFields, record ?? {})}
        validationSchema={FormValidations(feedbackFields, record ?? {})}
      >
        {(form) => (
          <form
            onSubmit={
              showActions
                ? form.handleSubmit
                : (event) => event.preventDefault()
            }
          >
            <ImagesFormItem
              name="image"
              schema={feedbackFields}
              path="feedbacks/image"
              fileProps={{}}
            />
            <DatePickerFormItem
              name="feedback_date"
              schema={feedbackFields}
              showTimeInput
            />
            <ProductsAutocompleteFormItem
              name="product"
              schema={feedbackFields}
              showCreate={!modal}
            />
            <UsersAutocompleteFormItem
              name="user"
              schema={feedbackFields}
              showCreate={!modal}
            />
            <InputFormItem name="firstname" schema={feedbackFields} />
            <InputFormItem name="lastname" schema={feedbackFields} />
            <TextAreaFormItem name="review" schema={feedbackFields} />
            <InputNumberFormItem name="rating" schema={feedbackFields} />
            <RadioFormItem name="status" schema={feedbackFields} />
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
