import { api } from "../../api/api";
import type {
  AuthResponse,
  RegisterAccountPayload,
  User,
  VerifyEmailPayload,
} from "./auth.config";

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

//TODO: criar um context para user
export const registerAccountApi = async (payload: RegisterAccountPayload) => {
  const res = await api.post("/user", payload);
  return res.data;
};

export const verifyEmailRequest = async (payload: VerifyEmailPayload) => {
  const res = await api.post("/user/verify-email", payload);
  return res.data;
};
