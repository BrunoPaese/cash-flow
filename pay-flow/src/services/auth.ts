import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

export async function loginRequest(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}
