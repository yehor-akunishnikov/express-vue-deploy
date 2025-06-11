<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { type AlertVariants, alertVariants } from ".";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  severity?: AlertVariants["variant"];
}>();
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(alertVariants({ variant: severity }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
