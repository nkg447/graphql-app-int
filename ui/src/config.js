import Themes from "./theme/theme";
const Config = {
  baseUrl:
    process.env.NODE_ENV === "development" ? "http://localhost:8080" : "",
  ...Themes.blueish,
};

export default Config;
