import { useEffect, useState } from "react";
import { authApi } from "@/api/auth";

export type User = { name: string; email: string };
const KEY = "plasma_user_v1";
const TOKEN_KEY = "plasma_token";
const listeners = new Set<(u: User | null) => void>();

let current: User | null = (() => {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
})();

function set(u: User | null) {
  current = u;
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else { localStorage.removeItem(KEY); localStorage.removeItem(TOKEN_KEY); }
  listeners.forEach((l) => l(u));
}

export function useAuth() {
  const [u, setU] = useState(current);
  useEffect(() => { listeners.add(setU); return () => { listeners.delete(setU); }; }, []);
  return {
    user: u,
    login: async (email: string, password: string) => {
      const res = await authApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      set({ name: res.name, email: res.email });
    },
    signup: async (name: string, email: string, password: string) => {
      const res = await authApi.signup(name, email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      set({ name: res.name, email: res.email });
    },
    logout: () => set(null),
  };
}
