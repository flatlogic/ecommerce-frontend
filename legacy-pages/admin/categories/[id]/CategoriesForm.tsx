import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import categoriesFields from "components/admin/CRUD/Categories/categoriesFields";
import IniValues from "components/admin/FormItems/iniValues";
import Widget from "components/admin/Widget";
import type { CategoryFormProps } from "../new/CategoriesForm";

export default function CategoriesView({
  findLoading,
  isEditing,
  record,
}: CategoryFormProps) {
  if (findLoading || (isEditing && !record)) return <Loader />;
  return (
    <Widget title={<h4>View сategories</h4>} collapse close>
      <Formik
        onSubmit={() => undefined}
        initialValues={IniValues(categoriesFields, record ?? {})}
      >
        {() => (
          <form onSubmit={(event) => event.preventDefault()}>
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
          </form>
        )}
      </Formik>
    </Widget>
  );
}
