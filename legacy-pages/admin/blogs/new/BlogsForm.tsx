import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import TextAreaFormItem from "components/admin/FormItems/items/TextAreaFormItem";
import blogsFields from "components/admin/CRUD/Blogs/blogsFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import CategoriesAutocompleteFormItem from "../../categories/autocomplete/CategoriesAutocompleteFormItem";
import BlogsAutocompleteFormItem from "../autocomplete/BlogsAutocompleteFormItem";
import type { FormRecord } from "types/forms";

export interface BlogFormProps {
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

const imageFields = [
  "hero_image",
  "blog_image_one",
  "blog_image_two",
  "blog_image_three",
  "author_avatar",
];
const textFields = [
  "epigraph",
  "first_paragraph",
  "second_paragraph",
  "third_paragraph",
  "fourth_paragraph",
  "fifth_paragraph",
  "point_one_description",
  "point_two_description",
  "point_three_description",
  "point_four_description",
  "point_five_description",
];
const inputFields = [
  "title",
  "author_name",
  "blog_image_one_annotation",
  "blog_image_two_annotation",
  "blog_image_three_annotation",
  "blog_image_four_annotation",
  "blog_image_five_annotation",
  "point_one_title",
  "point_two_title",
  "point_three_title",
  "point_four_title",
  "point_five_title",
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

export default function BlogsForm({
  findLoading,
  isEditing,
  isProfile,
  modal = false,
  onCancel,
  onSubmit,
  record,
  saveLoading,
  showActions = true,
}: BlogFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  const title = isProfile
    ? "Edit My Profile"
    : isEditing
      ? "Edit blogs"
      : "Add blogs";
  return (
    <Widget title={<h4>{title}</h4>} collapse close>
      <Formik<FormRecord>
        onSubmit={(values) => {
          const { id, ...data } = PreparedValues(blogsFields, values);
          onSubmit(String(id ?? ""), data);
        }}
        initialValues={IniValues(blogsFields, record ?? {})}
        validationSchema={FormValidations(blogsFields, record ?? {})}
      >
        {(form) => (
          <form
            onSubmit={
              showActions
                ? form.handleSubmit
                : (event) => event.preventDefault()
            }
          >
            {imageFields.map((name) => (
              <ImagesFormItem
                key={name}
                name={name}
                schema={blogsFields}
                path="blogs/image"
                fileProps={{}}
              />
            ))}
            {inputFields.slice(0, 2).map((name) => (
              <InputFormItem key={name} name={name} schema={blogsFields} />
            ))}
            {textFields.slice(0, 6).map((name) => (
              <TextAreaFormItem key={name} name={name} schema={blogsFields} />
            ))}
            {inputFields.slice(2, 7).map((name) => (
              <InputFormItem key={name} name={name} schema={blogsFields} />
            ))}
            {inputFields.slice(7, 12).map((name, index) => (
              <div key={name}>
                <InputFormItem name={name} schema={blogsFields} />
                <TextAreaFormItem
                  name={textFields[index + 6] ?? ""}
                  schema={blogsFields}
                />
              </div>
            ))}
            <CategoriesAutocompleteFormItem
              name="categories"
              schema={blogsFields}
              showCreate={!modal}
              mode="multiple"
            />
            <BlogsAutocompleteFormItem
              name="more_blogs"
              schema={blogsFields}
              showCreate={!modal}
              mode="multiple"
            />
            {inputFields.slice(12).map((name) => (
              <InputFormItem key={name} name={name} schema={blogsFields} />
            ))}
            <RadioFormItem name="status" schema={blogsFields} />
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
