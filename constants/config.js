const hostApi =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "https://ecommerce-generator-app.herokuapp.com";
const portApi =
  process.env.NODE_ENV === "development" ? "8080" : process.env.PORT;
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

export default {
  hostApi,
  portApi,
  baseURLApi,
  remote: "https://flatlogic-ecommerce-backend.herokuapp.com:53448",
  isBackend: process.env.REACT_APP_BACKEND,
  app: {
    colors: {
      dark: "#002B49",
      light: "#FFFFFF",
      sea: "#004472",
      sky: "#E9EBEF",
      wave: "#D1E7F6",
      rain: "#CCDDE9",
      middle: "#D7DFE6",
      black: "#13191D",
      salat: "#21AE8C",
    },
  },
};
