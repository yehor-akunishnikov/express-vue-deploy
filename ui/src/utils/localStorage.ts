import { authTokenKey } from "@/constants/common";

export const hasAuthToken = (): boolean => {
  return !!getAuthToken();
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(authTokenKey, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(authTokenKey);
};
