import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import categoriesFields from "components/admin/CRUD/Categories/categoriesFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import type { FormRecord } from "types/forms";

export interface CategoryFormProps {
  currentUser?: unknown;
  findLoading: boolean;
  isEditing: boolean;
  isProfile: boolean;
  onCancel: () => void;
  onSubmit: (id: string, data: FormRecord) => void;
  record: FormRecord | null;
  saveLoading: boolean;
}

export default function CategoriesForm({
  findLoading,
  isEditing,
  isProfile,
  onCancel,
  onSubmit,
  record,
  saveLoading,
}: CategoryFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit сategories"
      : "Add сategories";

  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(categoriesFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(categoriesFields, record ?? {})}
        validationSchema={FormValidations(categoriesFields, record ?? {})}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <InputFormItem name="title" schema={categoriesFields} autoFocus />
            <InputFormItem name="meta_description" schema={categoriesFields} />
            <InputFormItem name="keywords" schema={categoriesFields} />
            <InputFormItem name="meta_author" schema={categoriesFields} />
            <InputFormItem name="meta_og_title" schema={categoriesFields} />
            <InputFormItem name="meta_og_url" schema={categoriesFields} />
            <InputFormItem name="meta_og_image" schema={categoriesFields} />
            <InputFormItem name="meta_fb_id" schema={categoriesFields} />
            <InputFormItem name="meta_og_sitename" schema={categoriesFields} />
            <InputFormItem name="post_twitter" schema={categoriesFields} />
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
          </form>
        )}
      </Formik>
    </Widget>
  );
}
