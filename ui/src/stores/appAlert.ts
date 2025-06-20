import { defineStore } from "pinia";
import { ref } from "vue";

import { type AlertConfig } from "@/types/common";

export const useAppAlertStore = defineStore("appAlertStore", () => {
  const configsQueue = ref<AlertConfig[]>([]);
  const alertRemovalInterval = ref<number | null>(null);

  function startCleanup(durationMs: number): void {
    alertRemovalInterval.value = setInterval(() => {
      configsQueue.value.shift();

      if (!configsQueue.value.length) {
        clearInterval(alertRemovalInterval.value!);
      }
    }, durationMs);
  }

  function show(alertConfig: AlertConfig): void {
    const MAX_ALERTS_AT_A_TIME = 5;
    const DEFAULT_DISPLAY_TIME_MS = 3000;

    if (configsQueue.value.length >= MAX_ALERTS_AT_A_TIME) return;

    alertConfig.id = crypto.randomUUID();
    alertConfig.title = alertConfig.title ?? alertConfig.severity;
    configsQueue.value = [...configsQueue.value, alertConfig];

    if (!alertRemovalInterval.value) {
      startCleanup(alertConfig.durationMs ?? DEFAULT_DISPLAY_TIME_MS);
    }
  }

  return { show, configsQueue };
});
