import { Formik } from "formik";
import Loader from "components/admin/Loader";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import Widget from "components/admin/Widget";
import type { FormFields } from "types/forms";

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordFormProps {
  findLoading: boolean;
  onCancel: () => void;
  onSubmit: (values: PasswordFormValues) => void;
  saveLoading: boolean;
}

const passwordSchema: FormFields = {
  currentPassword: { type: "string", label: "Current Password" },
  newPassword: { type: "string", label: "New Password" },
  confirmNewPassword: { type: "string", label: "Current Password" },
};

export default function ChangePasswordForm({
  findLoading,
  onCancel,
  onSubmit,
  saveLoading,
}: ChangePasswordFormProps) {
  if (findLoading) return <Loader />;
  return (
    <Widget title={<h4>Change Password</h4>} collapse close>
      <Formik<PasswordFormValues>
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={onSubmit}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <InputFormItem
              name="currentPassword"
              password
              schema={passwordSchema}
            />
            <InputFormItem
              name="newPassword"
              schema={passwordSchema}
              password
            />
            <InputFormItem
              name="confirmNewPassword"
              schema={passwordSchema}
              password
            />
            <div className="form-buttons">
              <button
                className="btn btn-primary"
                disabled={saveLoading}
                type="submit"
              >
                Change Password
              </button>{" "}
              <button
                className="btn btn-light"
                type="button"
                disabled={saveLoading}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Widget>
  );
}
