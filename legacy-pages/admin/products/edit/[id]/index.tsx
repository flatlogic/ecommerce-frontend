import ProductsFormPage from "../../ProductsFormPage";
import ProductForm from "./ProductForm";
export default function EditProductPage() {
  return <ProductsFormPage FormComponent={ProductForm} title="Edit Product" />;
}
