import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, getMeRequest, logoutRequest } from "./auth.service";
import type { User } from "./auth.config";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);

    localStorage.setItem("accessToken", data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("accessToken");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getMeRequest();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
