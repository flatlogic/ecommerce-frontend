const config = {
  name: "react ecommerce",
  title: "React Ecommerce built with React JS by Flatlogic",
  version: "3.8.0",
  settings: {
    screens: {
      "xs-max": 543,
      "sm-min": 544,
      "sm-max": 767,
      "md-min": 768,
      "md-max": 991,
      "lg-min": 992,
      "lg-max": 1199,
      "xl-min": 1200,
    },
    navCollapseTimeout: 2500,
  },
};

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

export default function isScreen(size: ScreenSize) {
  const screenPx = window.innerWidth;
  const minimum = size === "xs" ? 0 : config.settings.screens[`${size}-min`];
  const maximum =
    size === "xl"
      ? Number.POSITIVE_INFINITY
      : config.settings.screens[`${size}-max`];
  return screenPx >= minimum && screenPx <= maximum;
}
