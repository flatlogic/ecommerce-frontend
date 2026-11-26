import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import InputNumberFormItem from "components/admin/FormItems/items/InputNumberFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import TextAreaFormItem from "components/admin/FormItems/items/TextAreaFormItem";
import productsFields from "components/admin/CRUD/Products/productsFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import CategoriesAutocompleteFormItem from "../../categories/autocomplete/CategoriesAutocompleteFormItem";
import ProductsAutocompleteFormItem from "../autocomplete/ProductsAutocompleteFormItem";
import type { FormRecord } from "types/forms";

export interface ProductFormProps {
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
const metadataFields = [
  "meta_description",
  "keywords",
  "meta_author",
  "meta_og_title",
  "meta_og_url",
  "meta_og_image",
  "meta_fb_id",
  "meta_og_sitename",
  "post_twitter",
];
export default function ProductsForm({
  findLoading,
  isEditing,
  isProfile,
  modal = false,
  onCancel,
  onSubmit,
  record,
  saveLoading,
  showActions = true,
}: ProductFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit products"
      : "Add products";
  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(productsFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(productsFields, record ?? {})}
        validationSchema={
          showActions
            ? FormValidations(productsFields, record ?? {})
            : undefined
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
            <ImagesFormItem
              name="image"
              schema={productsFields}
              path="products/image"
              fileProps={{}}
            />
            <InputFormItem name="title" schema={productsFields} />
            <InputFormItem name="price" schema={productsFields} />
            <InputFormItem name="discount" schema={productsFields} />
            <TextAreaFormItem name="description" schema={productsFields} />
            <CategoriesAutocompleteFormItem
              name="categories"
              schema={productsFields}
              showCreate={!modal}
              mode="multiple"
            />
            <ProductsAutocompleteFormItem
              name="more_products"
              schema={productsFields}
              showCreate={!modal}
              mode="multiple"
            />
            {metadataFields.map((name) => (
              <InputFormItem key={name} name={name} schema={productsFields} />
            ))}
            <InputNumberFormItem name="rating" schema={productsFields} />
            <RadioFormItem name="status" schema={productsFields} />
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
