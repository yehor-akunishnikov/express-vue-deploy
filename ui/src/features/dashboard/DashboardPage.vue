<script setup lang="ts">
import { onMounted, ref } from "vue";

import httpClient from "@/utils/httpClient";

const state = ref<string>();

onMounted(async () => {
  try {
    const data = await httpClient.POST("/api/hello", {
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
  <h1>Dashboard page works</h1>
  <p>Response from server:</p>
  <p>{{ state }}</p>
</template>
