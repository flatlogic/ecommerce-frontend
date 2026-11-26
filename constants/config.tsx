const baseURLApi = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api"
).replace(/\/$/, "");
const apiUrl = new URL(baseURLApi);
const hostApi = apiUrl.origin;
const portApi = apiUrl.port;

const config = {
  hostApi,
  portApi,
  baseURLApi,
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

export default config;
