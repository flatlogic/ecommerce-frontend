declare module "react-select-country-list" {
  interface CountryOption {
    label: string;
    value: string;
  }
  export default function countryList(): { getData(): CountryOption[] };
}
