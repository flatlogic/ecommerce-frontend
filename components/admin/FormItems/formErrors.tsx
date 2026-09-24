import type { ReactNode } from "react";
import type { FormStateLike } from "types/forms";

export default class FormErrors {
  static displayableError(
    form: FormStateLike,
    fieldName: string,
    externalErrorMessage: string | null = null,
  ): ReactNode {
    if (externalErrorMessage) {
      return externalErrorMessage;
    }

    if (!form.touched[fieldName]) {
      return null;
    }

    const errors = form.errors[fieldName];

    if (!errors) {
      return null;
    }

    if (Array.isArray(errors)) {
      return errors[0] == null ? null : String(errors[0]);
    }

    return String(errors);
  }

  static validateStatus(
    form: FormStateLike,
    fieldName: string,
    externalErrorMessage?: string | null,
  ) {
    if (this.displayableError(form, fieldName, externalErrorMessage)) {
      return "is-invalid";
    }

    return "";
  }
}
