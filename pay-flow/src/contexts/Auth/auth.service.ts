import { api } from "../../api/api";
import type { AuthResponse, User } from "./auth.config";

export const loginRequest = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getMeRequest = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};
