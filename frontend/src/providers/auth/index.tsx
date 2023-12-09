import { AuthProvider, HttpError } from "react-admin";
import { doFetch, handleError } from "../../utils/network";

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
  checkError: async (error) => {
    const status = error.status;
    const auth = localStorage.getItem("auth");
    if (status === 401) {
      try {
        if (!auth) throw new Error();
        const { refreshToken } = JSON.parse(auth);

        const request = new Request(`${apiUrl}/auth/refresh`, {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          headers: new Headers({ "Content-Type": "application/json" }),
        });

        const { data } = await doFetch(request);

        if (!data.token) throw new Error();

        localStorage.setItem("auth", JSON.stringify(data));
      } catch (error) {
        localStorage.removeItem("auth");
        return Promise.reject();
      }
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
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
