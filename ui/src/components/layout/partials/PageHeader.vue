<script setup lang="ts">
import { RouterLink } from "vue-router";

import { useCurrentUserStore } from "@/stores/currentUser.ts";

const currentUserStore = useCurrentUserStore();
</script>

<template>
  <header>
    <div>
      <nav class="flex justify-between py-1 px-2 border border-black">
        <div class="space-x-2">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink
            v-if="currentUserStore.isAuthorized"
            to="/dashboard"
          >
            Dashboard
          </RouterLink>
        </div>

        <div class="flex gap-x-2">
          <div v-if="currentUserStore.isAuthorized">
            {{ currentUserStore.currentUser?.name }}
          </div>

          <div class="space-x-2">
            <RouterLink
              to="/auth"
              v-if="currentUserStore.isAuthorized"
            >
              Logout
            </RouterLink>
            <RouterLink
              to="/auth/login"
              v-else
            >
              Login
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
