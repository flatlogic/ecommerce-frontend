import { useEffect, type ComponentType } from "react";
import Head from "components/compat/Head";
import { useRouter } from "components/compat/router";
import actions from "@/redux/actions/feedback/feedbackFormActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { LegacyDispatch } from "@/redux/legacyTypes";
import type { FormRecord } from "types/forms";
import type { FeedbackFormProps } from "./new/FeedbackForm";

interface FeedbackFormPageProps {
  FormComponent: ComponentType<FeedbackFormProps>;
  title: string;
}

const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default function FeedbackFormPage({
  FormComponent,
  title,
}: FeedbackFormPageProps) {
  const dispatch = useAppDispatch() as unknown as LegacyDispatch;
  const router = useRouter();
  const form = useAppSelector((state) => state.feedback.form);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const id = firstParam(router.query.id);
  const isEditing = Boolean(id);
  const isProfile = router.pathname === "/app/profile";

  useEffect(() => {
    if (id) dispatch(actions.doFind(id));
    else dispatch(actions.doNew());
  }, [dispatch, id]);

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
        <meta
          name="description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
      </Head>
      <FormComponent
        saveLoading={form.saveLoading}
        findLoading={form.findLoading}
        currentUser={currentUser}
        record={isEditing || isProfile ? form.record : {}}
        isEditing={isEditing}
        isProfile={isProfile}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/feedback")}
      />
    </>
  );
}
