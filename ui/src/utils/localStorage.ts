import { authTokenKey } from "@/constants/common";

export function hasAuthToken(): boolean {
  return !!getAuthToken();
}

export function getAuthToken(): string | null {
  return localStorage.getItem(authTokenKey);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(authTokenKey, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(authTokenKey);
}
