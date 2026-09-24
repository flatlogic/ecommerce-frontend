import EntityAutocompleteFormItem, {
  type EntityAutocompleteProps,
} from "components/admin/FormItems/items/EntityAutocompleteFormItem";

export default function BlogsAutocompleteFormItem(
  props: EntityAutocompleteProps,
) {
  return (
    <EntityAutocompleteFormItem
      {...props}
      endpoint="/blogs/autocomplete"
      labelKey="title"
    />
  );
}
