import { authTokenKey } from "@/constants/common.ts";

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(authTokenKey, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(authTokenKey);
};
