import { useEffect, type ComponentType } from "react";
import Head from "components/compat/Head";
import { useRouter } from "components/compat/router";
import actions from "@/redux/actions/users/usersFormActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { LegacyDispatch } from "@/redux/legacyTypes";
import type { FormRecord } from "types/forms";
import type { UserFormProps } from "./new/UsersForm";

interface UsersFormPageProps {
  FormComponent: ComponentType<UserFormProps>;
  title: string;
}
const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default function UsersFormPage({
  FormComponent,
  title,
}: UsersFormPageProps) {
  const dispatch = useAppDispatch() as unknown as LegacyDispatch;
  const router = useRouter();
  const form = useAppSelector((state) => state.users.form);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const id = firstParam(router.query.id);
  const isEditing = Boolean(id);
  const isProfile = router.pathname === "/app/profile";

  useEffect(() => {
    if (id) dispatch(actions.doFind(id));
    else if (isProfile) {
      const storedUser = localStorage.getItem("user");
      const parsed: unknown = storedUser ? JSON.parse(storedUser) : null;
      const profileId =
        typeof parsed === "object" &&
        parsed !== null &&
        "user" in parsed &&
        typeof parsed.user === "object" &&
        parsed.user !== null &&
        "id" in parsed.user
          ? String(parsed.user.id)
          : null;
      if (profileId) dispatch(actions.doFind(profileId));
    } else dispatch(actions.doNew());
  }, [dispatch, id, isProfile]);

  const handleSubmit = (recordId: string, data: FormRecord) => {
    if (isEditing || isProfile)
      dispatch(actions.doUpdate(recordId, data, isProfile));
    else dispatch(actions.doCreate(data));
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FormComponent
        saveLoading={form.saveLoading}
        findLoading={form.findLoading}
        currentUser={currentUser}
        record={isEditing || isProfile ? form.record : {}}
        isEditing={isEditing}
        isProfile={isProfile}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/users")}
      />
    </>
  );
}
