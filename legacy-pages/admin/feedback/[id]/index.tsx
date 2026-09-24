import FeedbackFormPage from "../FeedbackFormPage";
import FeedbackForm from "./FeedbackForm";

export default function ViewFeedbackPage() {
  return (
    <FeedbackFormPage FormComponent={FeedbackForm} title="View Feedback" />
  );
}
