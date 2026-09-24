import Head from "components/compat/Head";
import { useRouter } from "components/compat/router";
import actions from "@/redux/actions/password";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { LegacyDispatch } from "@/redux/legacyTypes";
import ChangePasswordForm, {
  type PasswordFormValues,
} from "./ChangePasswordForm";

export default function PasswordPage() {
  const dispatch = useAppDispatch() as unknown as LegacyDispatch;
  const router = useRouter();
  const form = useAppSelector((state) => state.users.form);
  return (
    <>
      <Head>
        <title>Edit Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChangePasswordForm
        saveLoading={form.saveLoading}
        findLoading={form.findLoading}
        onSubmit={(data: PasswordFormValues) =>
          dispatch(actions.doChangePassword(data))
        }
        onCancel={() => router.push("/app/dashboard")}
      />
    </>
  );
}
