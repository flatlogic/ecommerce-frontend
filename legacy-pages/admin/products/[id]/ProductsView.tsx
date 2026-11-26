import ProductsForm, { type ProductFormProps } from "../new/ProductsForm";
import s from "./ProductsView.module.scss";
export default function ProductsView(props: ProductFormProps) {
  return (
    <div className={s.root}>
      <ProductsForm {...props} showActions={false} />
    </div>
  );
}
