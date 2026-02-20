import React, { createContext, useContext, useEffect, useState } from "react";
import api, * as apiClient from "@/lib/apiClient";
import type { LoginDto, RegisterDto, UserDto } from "@/Api";
import { toast } from "sonner";

type AuthContextType = {
  token: string | null;
  user: UserDto | null;
  loading: boolean;
  error?: string | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        api.api.userDetail(userId).then(res => setUser(res.data));
        setToken(token);
        apiClient.setAuthToken(token);
      }
    }
  }, []);

  const login = async (data: LoginDto) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.login(data);

      const userId = res.data.id;
      const token = res.data.token;
      if (userId && token) {
        api.api.userDetail(userId).then(res => setUser(res.data));
        setToken(token);
        apiClient.setAuthToken(token);

        toast.success("Signed in");
      } else {
        toast.error("Login failed");
        setError(null);
      }
    } catch {
      toast.error("Login failed");
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.register(data);

      const userId = res.data.id;
      const token = res.data.token;
      if (userId && token) {
        api.api.userDetail(userId).then(res => setUser(res.data));
        setToken(token);
        apiClient.setAuthToken(token);

        toast.success("Account created");
      } else {
        toast.error("Registration failed");
        setError(null);
      }
    } catch {
      toast.error("Registration failed");
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    apiClient.setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
