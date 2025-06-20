<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <div class="p-4 w-full lg:w-1/2">
      <div class="px-8 md:px-10 pb-4 md:pb-6 inner">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.inner {
  border: 1px solid var(--color-black);
  border-radius: var(--radius-md);
}
</style>
