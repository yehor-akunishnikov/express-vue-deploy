import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { type AlertConfig } from "@/types/common";

export const useAppAlertStore = defineStore("appAlertStore", () => {
  const configsQueue = ref<AlertConfig[]>([]);
  const latestConfig = ref<AlertConfig | null>(null);

  const publicQueue = computed(() =>
    configsQueue.value.length ? configsQueue.value : [latestConfig.value],
  );
  const isShown = computed<boolean>(() => !!configsQueue.value.length);

  function show(alertConfig: AlertConfig): void {
    if (configsQueue.value.length >= 5) return;

    alertConfig.id = crypto.randomUUID();
    alertConfig.title = alertConfig.title ?? alertConfig.severity;
    configsQueue.value = [...configsQueue.value, alertConfig];
    latestConfig.value = alertConfig;

    setTimeout(
      () => {
        configsQueue.value.shift();
      },
      (alertConfig.durationMs ?? 3000) * configsQueue.value.length + 1,
    );
  }

  return { show, publicQueue, isShown };
});
