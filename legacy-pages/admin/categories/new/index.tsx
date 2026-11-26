import CategoriesFormPage from "../CategoriesFormPage";
import CategoriesForm from "./CategoriesForm";

export default function NewCategoryPage() {
  return (
    <CategoriesFormPage
      FormComponent={CategoriesForm}
      title="Create new category"
    />
  );
}
