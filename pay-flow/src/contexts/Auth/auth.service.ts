import { api } from "../../api/api";
import type { AuthResponse, User } from "./auth.config";

export const loginRequest = async (payload: User): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};
