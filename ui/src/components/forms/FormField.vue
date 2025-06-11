<script setup lang="ts">
import { cn } from "@/lib/utils";

defineProps<{
  id: string;
  label: string;
  errorMsg?: string;
}>();
</script>

<template>
  <div :class="cn('space-y-1 form-field', { invalid: !!errorMsg })">
    <label
      class="inline-block"
      :for="id"
    >
      {{ label }}
    </label>
    <slot />
    <p class="text-red-700 text-sm min-h-[1.5em]">
      {{ errorMsg }}
    </p>
  </div>
</template>
