import CategoriesFormPage from "../CategoriesFormPage";
import CategoriesForm from "./CategoriesForm";

export default function ViewCategoryPage() {
  return (
    <CategoriesFormPage FormComponent={CategoriesForm} title="View Category" />
  );
}
