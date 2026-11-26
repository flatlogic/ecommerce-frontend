import ProductsFormPage from "../ProductsFormPage";
import ProductsView from "./ProductsView";
export default function ViewProductPage() {
  return <ProductsFormPage FormComponent={ProductsView} title="View Product" />;
}
