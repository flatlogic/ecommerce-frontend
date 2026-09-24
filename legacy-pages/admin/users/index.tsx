import Head from "components/compat/Head";
import UsersListTable from "./UsersListTable";
export default function UsersPage() {
  return (
    <div>
      <Head>
        <title>Users List</title>
      </Head>
      <UsersListTable />
    </div>
  );
}
