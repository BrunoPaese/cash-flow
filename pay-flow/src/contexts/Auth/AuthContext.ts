import { createContext } from "react";
import type { User } from "./auth.config";

interface AuthContextData {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
