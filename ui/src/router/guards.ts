import { hasAuthToken, removeAuthToken } from "@/utils/localStorage.ts";
import { useCurrentUserStore } from "@/stores/currentUser.ts";

export const authGuard = (): boolean | { name: string } => {
  if (hasAuthToken()) {
    return true;
  } else {
    return { name: "auth" };
  }
};

export const userDataGuard = async (): Promise<boolean | { name: string }> => {
  if (hasAuthToken()) {
    const currentUserStore = useCurrentUserStore();

    if (!currentUserStore.currentUser) {
      await currentUserStore.load();
    }
  }

  return true;
};

export const logoutGuard = (): boolean => {
  removeAuthToken();

  const currentUserStore = useCurrentUserStore();

  currentUserStore.clear();

  return true;
};
