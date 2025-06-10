import { getAuthToken } from "@/utils/localStorage.ts";

export const authGuard = (): boolean | { name: string } => {
  if (getAuthToken()) {
    return true;
  } else {
    return { name: "auth" };
  }
};
