import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { type AlertConfig } from "@/types/common";

export const useAppAlertStore = defineStore("appAlertStore", () => {
  const configsQueue = ref<AlertConfig[]>([]);
  const latestConfig = ref<AlertConfig | null>(null);

  const currentConfig = computed<AlertConfig | null>(
    () => configsQueue.value[0] ?? latestConfig.value,
  );
  const isShown = computed<boolean>(() => !!configsQueue.value.length);

  function show(alertConfig: AlertConfig) {
    alertConfig.title = alertConfig.title ?? alertConfig.severity;
    configsQueue.value = [...configsQueue.value, alertConfig];
    latestConfig.value = alertConfig;

    setTimeout(
      () => {
        configsQueue.value.shift();
      },
      (alertConfig.durationMs ?? 5000) * configsQueue.value.length - 1,
    );
  }

  return { show, isShown, currentConfig, configsQueue };
});
