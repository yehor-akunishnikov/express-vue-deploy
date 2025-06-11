<script setup lang="ts">
import PageHeader from "@/components/layout/partials/PageHeader.vue";
</script>

<template>
  <PageHeader />
  <main class="main">
    <RouterView />
  </main>
  <footer></footer>
</template>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 34px);
  padding: 0.5rem;
}
</style>
