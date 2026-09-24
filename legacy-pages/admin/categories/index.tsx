import Head from "components/compat/Head";
import CategoriesListTable from "./CategoriesListTable";

export default function CategoriesPage() {
  return (
    <div>
      <Head>
        <title>Categories List</title>
      </Head>
      <CategoriesListTable />
    </div>
  );
}
