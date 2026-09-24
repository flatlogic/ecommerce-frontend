import BlogsForm, { type BlogFormProps } from "../new/BlogsForm";
export default function BlogsView(props: BlogFormProps) {
  return <BlogsForm {...props} showActions={false} />;
}
