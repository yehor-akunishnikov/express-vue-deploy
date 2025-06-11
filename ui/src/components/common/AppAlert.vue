<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppAlertStore } from "@/stores/appAlert";
import { cn } from "@/lib/utils";

const state = useAppAlertStore();
</script>

<template>
  <div class="wrapper w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    <Alert
      :class="
        cn(
          'transition-opacity duration-500',
          'drop-shadow-sm drop-shadow-gray-400',
          state.isShown ? 'opacity-100' : 'opacity-0',
        )
      "
      :severity="state.currentConfig?.severity"
    >
      <AlertTitle>
        {{ state.currentConfig?.title }}
      </AlertTitle>
      <AlertDescription>
        {{ state.currentConfig?.description }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  bottom: 0;
  right: 0;

  padding: 0.5rem;
}
</style>
