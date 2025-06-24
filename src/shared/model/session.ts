import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { publicFetchClient } from "../api/instance";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

let refreshTokenPromise: Promise<string | null> | null = null;

const TOKEN_KEY = "token";

interface SessionStore {
  token: string | null;
  session: Session | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  token: localStorage.getItem(TOKEN_KEY),
  session: localStorage.getItem(TOKEN_KEY)
    ? jwtDecode<Session>(localStorage.getItem(TOKEN_KEY)!)
    : null,
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, session: jwtDecode<Session>(token) });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, session: null });
  },
  refreshToken: async () => {
    const { token, login, logout } = get();

    if (!token) {
      return null;
    }

    const session = jwtDecode<Session>(token);

    if (session.exp < Date.now() / 1000) {
      console.log(session);

      if (refreshTokenPromise) {
        return refreshTokenPromise;
      }

      refreshTokenPromise = publicFetchClient
        //@ts-ignore
        .POST("/auth/refresh", { body: { token } })
        .then((response) => {
          if (!response.data?.accessToken) {
            throw new Error("No access token in response");
          }
          return response.data.accessToken;
        })
        .then((newToken) => {
          login(newToken);
          return newToken;
        })
        .catch((error) => {
          console.error("Refresh token failed:", error);
          logout();
          return null;
        })
        .finally(() => {
          refreshTokenPromise = null;
        });

      return refreshTokenPromise;
    }

    return token;
  },
}));
