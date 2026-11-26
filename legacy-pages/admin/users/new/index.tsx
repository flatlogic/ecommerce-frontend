import UsersFormPage from "../UsersFormPage";
import UsersForm from "./UsersForm";
export default function NewUserPage() {
  return <UsersFormPage FormComponent={UsersForm} title="Create new user" />;
}
