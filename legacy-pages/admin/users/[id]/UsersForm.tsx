import UsersForm, { type UserFormProps } from "../new/UsersForm";
import s from "./UsersForm.module.scss";
export default function UsersView(props: UserFormProps) {
  return (
    <div className={s.root}>
      <UsersForm {...props} showActions={false} />
    </div>
  );
}
