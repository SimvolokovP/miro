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
    const token = get().token;
    const login = get().login;
    const logout = get().logout;

    if (!token) {
      return null;
    }

    const session = jwtDecode<Session>(token);

    if (session.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST("/auth/refresh")
          .then((r) => r.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        return null;
      }
    }

    return token;
  },
}));
