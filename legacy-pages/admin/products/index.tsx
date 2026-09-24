import Head from "components/compat/Head";
import ProductsListTable from "./ProductsListTable";
export default function ProductsPage() {
  return (
    <div>
      <Head>
        <title>Products List</title>
      </Head>
      <ProductsListTable />
    </div>
  );
}
