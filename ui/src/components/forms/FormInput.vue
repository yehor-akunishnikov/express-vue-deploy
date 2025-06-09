<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

withDefaults(
  defineProps<{
    name: string;
    type: InputTypeHTMLAttribute;
    id: string;
    isInvalid?: boolean;
  }>(),
  {
    isInvalid: false,
  },
);

const model = defineModel<string>({ default: "" });
</script>

<template>
  <div class="input-wrapper">
    <input
      v-model="model"
      class="input"
      :type="type"
      :id="id"
      :name="name"
    />
    <div
      class="addon"
      v-if="$slots.addon"
    >
      <slot name="addon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: flex;

  border: 1px solid var(--color-black);
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  overflow: hidden;
}

.input {
  width: 100%;
  padding: 0.25rem 0.5rem;
}

.addon {
  display: flex;
  justify-content: center;
  align-items: center;

  border-left: 1px solid var(--color-black);
}
</style>
