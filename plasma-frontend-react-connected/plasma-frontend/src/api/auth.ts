import { api } from "./client";

export type AuthResponse = { token: string; name: string; email: string };

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }).then((r) => r.data),
  signup: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/signup", { name, email, password }).then((r) => r.data),
};
