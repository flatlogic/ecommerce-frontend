import BlogsFormPage from "../BlogsFormPage";
import BlogsForm from "./BlogsForm";
export default function NewBlogPage() {
  return <BlogsFormPage FormComponent={BlogsForm} title="Create new blog" />;
}
