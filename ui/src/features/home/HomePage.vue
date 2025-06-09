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
    <div class="text-center min-h-screen flex items-center justify-center">
      <div>
        <p>Response from server</p>
        <p>{{ state }}</p>
        <RouterLink to="/auth">Get started</RouterLink>
      </div>
    </div>
  </main>
</template>
