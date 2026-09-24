import BlogsFormPage from "../BlogsFormPage";
import BlogsView from "./BlogsView";
export default function ViewBlogPage() {
  return <BlogsFormPage FormComponent={BlogsView} title="View Blog" />;
}
