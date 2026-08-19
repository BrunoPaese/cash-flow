import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  getCurrentUser,
  logoutRequest,
  registerAccountApi,
  verifyEmailRequest,
} from "./auth.service";
import type {
  RegisterAccountPayload,
  User,
  VerifyEmailPayload,
} from "./auth.config";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const registerAccount = async (payload: RegisterAccountPayload) => {
    await registerAccountApi(payload);
  };

  const verifyEmail = async (payload: VerifyEmailPayload) => {
    await verifyEmailRequest(payload);
    await refreshUser();
  };

  const refreshUser = async (): Promise<User | null> => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) refreshUser();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
        refreshUser,
        registerAccount,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
