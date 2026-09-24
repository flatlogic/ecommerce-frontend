import Head from "components/compat/Head";
import OrdersListTable from "./OrdersListTable";
export default function OrdersPage() {
  return (
    <div>
      <Head>
        <title>Orders List</title>
      </Head>
      <OrdersListTable />
    </div>
  );
}
