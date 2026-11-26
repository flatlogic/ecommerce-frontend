import FeedbackForm, { type FeedbackFormProps } from "../new/FeedbackForm";

export default function FeedbackView(props: FeedbackFormProps) {
  return <FeedbackForm {...props} showActions={false} />;
}
