import OrdersForm, { type OrderFormProps } from "../new/OrdersForm";
export default function OrdersView(props: OrderFormProps) {
  return <OrdersForm {...props} showActions={false} />;
}
