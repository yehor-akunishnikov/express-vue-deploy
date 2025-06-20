<script setup lang="ts">
import { cn } from "@/lib/utils";

defineProps<{
  text: string | null;
}>();
</script>

<template>
  <p
    :class="
      cn(
        'message text-red-700 text-center text-sm transition-opacity duration-500',
        text ? 'opacity-100' : 'opacity-0',
      )
    "
  >
    {{ text }}
  </p>
</template>

<style scoped lang="scss">
.message {
  min-height: 20px;
}
</style>
