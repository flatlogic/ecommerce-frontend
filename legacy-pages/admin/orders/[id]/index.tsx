import OrdersFormPage from "../OrdersFormPage";
import OrdersForm from "./OrdersForm";
export default function ViewOrderPage() {
  return <OrdersFormPage FormComponent={OrdersForm} title="View Order" />;
}
