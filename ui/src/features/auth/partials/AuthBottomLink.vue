<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <RouterLink
    class="link"
    :to="to"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  display: block;
  width: 100%;
  color: var(--color-teal-700);
  text-decoration: underline;
  text-align: center;
}
</style>
