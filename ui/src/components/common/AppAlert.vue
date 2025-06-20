<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppAlertStore } from "@/stores/appAlert";

const state = useAppAlertStore();
</script>

<template>
  <Transition>
    <div
      class="wrapper"
      v-if="state.isShown"
    >
      <Alert
        v-for="(config, i) in state.publicQueue"
        :key="config?.id"
        :severity="config?.severity"
        :index="i"
      >
        <AlertTitle>
          {{ config?.title }}
        </AlertTitle>
        <AlertDescription>
          {{ config?.description }}
        </AlertDescription>
      </Alert>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;

  position: fixed;
  bottom: 0;
  right: 0;

  padding: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
