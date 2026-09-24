import ProductsFormPage from "../ProductsFormPage";
import ProductsForm from "./ProductsForm";
export default function NewProductPage() {
  return (
    <ProductsFormPage FormComponent={ProductsForm} title="Create new product" />
  );
}
