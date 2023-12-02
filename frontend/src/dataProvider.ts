import simpleRestProvider from "ra-data-simple-rest";
import { Options, fetchUtils } from "react-admin";

const httpClient = (url: string, options: Options = {}) => {
  const headers = options?.headers
    ? new Headers(options.headers)
    : new Headers({ Accept: "application/json" });

  const { token } = JSON.parse(localStorage.getItem("auth") || "{}");
  headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, { ...options, headers });
};

export const dataProvider = simpleRestProvider(
  import.meta.env.VITE_API_URL,
  httpClient
);
