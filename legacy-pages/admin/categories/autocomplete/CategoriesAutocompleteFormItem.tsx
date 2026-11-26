import EntityAutocompleteFormItem, {
  type EntityAutocompleteProps,
} from "components/admin/FormItems/items/EntityAutocompleteFormItem";

export default function CategoriesAutocompleteFormItem(
  props: EntityAutocompleteProps,
) {
  return (
    <EntityAutocompleteFormItem
      {...props}
      endpoint="/categories/autocomplete"
      labelKey="title"
    />
  );
}
