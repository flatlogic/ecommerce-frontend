import Head from "components/compat/Head";
import FeedbackListTable from "./FeedbackListTable";

export default function FeedbackPage() {
  return (
    <div>
      <Head>
        <title>Feedback List</title>
      </Head>
      <FeedbackListTable />
    </div>
  );
}
