import simpleRestProvider from "ra-data-simple-rest";
import { Options, fetchUtils, DataProvider } from "react-admin";
import { handleSurgeryCreate } from "./surgery";
import { handleClassificationCreate } from "./classification";

const httpClient = (url: string, options: Options = {}) => {
  const headers = options?.headers
    ? new Headers(options.headers)
    : new Headers({ Accept: "application/json" });

  const { token } = JSON.parse(localStorage.getItem("auth") || "{}");
  headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, { ...options, headers });
};

const dataProvider = simpleRestProvider(
  import.meta.env.VITE_API_URL,
  httpClient
);

const customDataProvider: DataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    switch (resource) {
      case "surgery":
        return handleSurgeryCreate(resource, params, dataProvider);
      case "classification":
        return handleClassificationCreate(resource, params, dataProvider);
      default:
        return dataProvider.create(resource, params);
    }
  },
};

export default customDataProvider;
