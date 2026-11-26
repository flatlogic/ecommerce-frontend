import Head from "components/compat/Head";
import BlogsListTable from "./BlogsListTable";
export default function BlogsPage() {
  return (
    <div>
      <Head>
        <title>Blogs List</title>
      </Head>
      <BlogsListTable />
    </div>
  );
}
