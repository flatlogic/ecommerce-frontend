import axios from "axios";
import AutocompleteFormItem, {
  type AutocompleteFormItemProps,
  type AutocompleteMapper,
} from "./AutocompleteFormItem";

export type EntityAutocompleteProps = Omit<
  AutocompleteFormItemProps,
  "fetchFn" | "mapper" | "hasPermissionToCreate"
>;

interface EntityAutocompleteFormItemProps extends EntityAutocompleteProps {
  endpoint: string;
  labelKey: string;
}

export default function EntityAutocompleteFormItem({
  endpoint,
  labelKey,
  ...props
}: EntityAutocompleteFormItemProps) {
  const fetchFn = async (query: string, limit: number): Promise<unknown[]> => {
    const response = await axios.get<unknown>(endpoint, {
      params: { query, limit },
    });
    return Array.isArray(response.data) ? response.data : [];
  };

  const mapper: AutocompleteMapper = {
    toAutocomplete(value) {
      if (typeof value !== "object" || value === null || !("id" in value))
        return undefined;
      const record = value as Record<string, unknown>;
      const id = String(record.id);
      const label =
        typeof record.label === "string"
          ? record.label
          : typeof record[labelKey] === "string"
            ? record[labelKey]
            : id;
      return { key: id, value: id, label };
    },
    toValue(value) {
      return { id: value.value, label: value.label };
    },
  };

  return <AutocompleteFormItem {...props} fetchFn={fetchFn} mapper={mapper} />;
}
