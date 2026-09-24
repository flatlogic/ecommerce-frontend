import CategoriesFormPage from "../../CategoriesFormPage";
import CategoriesForm from "./CategoriesForm";

export default function EditCategoryPage() {
  return (
    <CategoriesFormPage FormComponent={CategoriesForm} title="Edit Category" />
  );
}
