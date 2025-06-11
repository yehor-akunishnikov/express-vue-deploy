import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { CurrentUser } from "@/types/user";
import httpClient from "@/utils/httpClient";

export const useCurrentUserStore = defineStore("currentUser", () => {
  const currentUser = ref<CurrentUser | null>(null);
  const isLoading = ref(false);

  const isAuthorized = computed(() => !!currentUser.value);
  const isUnauthorized = computed(() => !currentUser.value);

  async function load(): Promise<void> {
    try {
      isLoading.value = true;
      currentUser.value = await httpClient.GET<CurrentUser>("/api/user/me", { isAuth: true });
      isLoading.value = false;
    } catch (e) {
      currentUser.value = null;
      isLoading.value = false;
    }
  }

  function clear(): void {
    currentUser.value = null;
    isLoading.value = false;
  }

  return { currentUser, isAuthorized, isUnauthorized, isLoading, clear, load };
});
