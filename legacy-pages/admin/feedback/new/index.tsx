import FeedbackFormPage from "../FeedbackFormPage";
import FeedbackForm from "./FeedbackForm";

export default function NewFeedbackPage() {
  return (
    <FeedbackFormPage
      FormComponent={FeedbackForm}
      title="Create new feedback"
    />
  );
}
