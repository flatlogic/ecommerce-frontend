import type { ReactNode } from "react";

export interface FormOption {
  value: string | number;
  label: ReactNode;
}

export interface FormFieldDefinition {
  label?: string;
  required?: boolean;
  type: string;
  options?: FormOption[];
  [key: string]: unknown;
}

export type FormFields = Record<string, FormFieldDefinition>;
export type FormRecord = Record<string, unknown>;

export interface FormStateLike {
  errors: Record<string, unknown>;
  touched: Record<string, boolean | undefined>;
}
