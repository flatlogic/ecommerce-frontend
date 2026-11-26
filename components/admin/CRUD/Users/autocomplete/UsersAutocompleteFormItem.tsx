import axios from "axios";
import React from "react";
import AutocompleteFormItem, {
  type AutocompleteFormItemProps,
  type AutocompleteMapper,
} from "components/admin/FormItems/items/AutocompleteFormItem";

async function listAutocomplete(
  query: string,
  limit: number,
): Promise<unknown[]> {
  const params = { query, limit };
  const response = await axios.get<unknown>(`/users/autocomplete`, { params });
  return Array.isArray(response.data) ? response.data : [];
}

type UsersAutocompleteProps = Omit<
  AutocompleteFormItemProps,
  "fetchFn" | "mapper" | "hasPermissionToCreate"
>;

const mapper: AutocompleteMapper = {
  toAutocomplete(originalValue) {
    if (
      typeof originalValue !== "object" ||
      originalValue === null ||
      !("id" in originalValue)
    )
      return undefined;
    const value = String(originalValue.id);
    const label =
      "label" in originalValue && typeof originalValue.label === "string"
        ? originalValue.label
        : "email" in originalValue && typeof originalValue.email === "string"
          ? originalValue.email
          : value;

    return { key: value, value, label };
  },
  toValue(originalValue) {
    return { id: originalValue.value, label: originalValue.label };
  },
};

export default function UsersAutocompleteFormItem(
  props: UsersAutocompleteProps,
) {
  return (
    <AutocompleteFormItem
      {...props}
      fetchFn={listAutocomplete}
      mapper={mapper}
    />
  );
}
