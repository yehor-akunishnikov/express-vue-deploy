<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

defineProps<{
  type: ButtonHTMLAttributes["type"];
  disabled?: boolean;
}>();
</script>

<template>
  <button
    class="btn"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  width: 100%;
  padding: 0.75rem 0.5rem;

  cursor: pointer;
  border-radius: var(--radius-md);
  color: var(--color-white);
  background: var(--color-teal-800);
  border-width: 1px;
  border-style: solid;
  border-color: unset;
  font-size: var(--text-lg);

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--color-teal-700);
    color: var(--color-gray-200);
    border-color: var(--color-black);
  }
}
</style>
