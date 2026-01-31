import { Api } from "@/Api";
import type { LoginDto, RegisterDto, UpdateUserDto } from "@/Api";

const baseUrl = import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_BASEURL || "";

const api = new Api({
  baseUrl,
  securityWorker: (token: string | null) =>
    token
      ? {
          headers: { authorization: `Bearer ${token}` },
        }
      : {},
});

export const setAuthToken = (token: string | null) => {
  api.setSecurityData(token);
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }
};

export const login = async (data: LoginDto) => {
  const res = await api.api.accountLoginCreate(data);

  const userId = res.data.id;
  if (userId && typeof window !== "undefined") localStorage.setItem("userId", userId.toString());

  const token = res.data.token ?? null;
  if (token) setAuthToken(token);

  return res;
};

export const register = async (data: RegisterDto) => {
  const res = await api.api.accountRegisterCreate(data);

  const userId = res.data.id;
  if (userId && typeof window !== "undefined") localStorage.setItem("userId", userId.toString());

  const token = res.data.token ?? null;
  if (token) setAuthToken(token);

  return res;
};

export const updateUser = async (data: UpdateUserDto) => {
  return await api.api.userUpdate(data);
}

export default api;
