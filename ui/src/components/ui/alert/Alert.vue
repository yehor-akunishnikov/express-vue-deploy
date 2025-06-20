<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { type AlertVariants, alertVariants } from ".";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  severity?: AlertVariants["variant"];
  index: number;
}>();

function getQueueItemStyle(index: number): string {
  return `right: ${(index + 1) * 5}px; bottom: ${(index + 1) * 5}px; z-index: -${index}`;
}
</script>

<template>
  <div
    data-slot="alert"
    :style="getQueueItemStyle(index)"
    :class="cn(alertVariants({ variant: severity }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
