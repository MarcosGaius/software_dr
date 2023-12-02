import { AuthProvider, HttpError } from "react-admin";
import { doFetch, handleError } from "./utils/network";

const apiUrl = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    try {
      const { data } = await doFetch(request);

      if (data.errors) {
        throw new HttpError("Senha ou email inválidos!", 401, {
          message: "Invalid username or password",
        });
      }

      localStorage.setItem(
        "auth",
        JSON.stringify({
          refreshToken: data.refreshToken,
          token: data.token,
          tokenExpires: data.tokenExpires,
        })
      );

      return Promise.resolve();
    } catch (e) {
      handleError(e);
    }
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const auth = localStorage.getItem("auth");

    if (!auth) return Promise.reject({ message: "Não autorizado!" });

    const { expiresIn } = JSON.parse(auth);

    if (Date.now() > expiresIn) {
      return Promise.reject({
        message: "Sessão expirada. Entre com sua conta novamente!",
      });
    }

    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
