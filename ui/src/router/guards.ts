import { hasAuthToken, removeAuthToken } from "@/utils/localStorage";
import { useCurrentUserStore } from "@/stores/currentUser";

export function authGuard(): boolean | { name: string } {
  if (hasAuthToken()) {
    return true;
  } else {
    return { name: "auth" };
  }
}

export async function userDataGuard(): Promise<boolean | { name: string }> {
  if (hasAuthToken()) {
    const currentUserStore = useCurrentUserStore();

    if (!currentUserStore.currentUser) {
      await currentUserStore.load();
    }
  }

  return true;
}

export function logoutGuard(): boolean {
  removeAuthToken();

  const currentUserStore = useCurrentUserStore();

  currentUserStore.clear();

  return true;
}
