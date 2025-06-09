<script setup lang="ts">
import { onMounted, ref } from "vue";

const state = ref<string>();

onMounted(async () => {
  const data = await fetch("/api/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "test",
    }),
  }).then((data) => data.json());

  state.value = JSON.stringify(data);
});
</script>

<template>
  <main>
    <div style="padding: 1rem">
      <p style="text-align: center">Response from server</p>
      <p style="text-align: center">{{ state }}</p>
    </div>
  </main>
</template>
