import OrdersFormPage from "../OrdersFormPage";
import OrdersForm from "./OrdersForm";
export default function NewOrderPage() {
  return <OrdersFormPage FormComponent={OrdersForm} title="Create new order" />;
}
