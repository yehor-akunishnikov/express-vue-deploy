<script setup lang="ts">
import { onMounted, ref } from "vue";
import httpClient from "@/utils/httpClient.ts";

const state = ref<string>();

onMounted(async () => {
  try {
    const data = await httpClient.POST("/api/hello", {
      isAuth: true,
      init: {
        body: JSON.stringify({
          name: "test",
        }),
      },
    });

    state.value = JSON.stringify(data);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <main>
    <div class="text-center min-h-screen flex items-center justify-center">
      <div>
        <p>Response from server</p>
        <p>{{ state }}</p>
        <RouterLink to="/dashboard">Get started</RouterLink>
      </div>
    </div>
  </main>
</template>
