<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";

import FormInput from "@/components/forms/FormInput.vue";

const isShown = ref(false);
const iconSize = 20;

defineProps<{
  id: string;
  isInvalid?: boolean;
  name: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <FormInput
    v-model="model"
    :id="id"
    :type="isShown ? 'text' : 'password'"
    :isInvalid="isInvalid"
    :name="name"
  >
    <template #addon>
      <button
        class="button"
        type="button"
        @click="isShown = !isShown"
      >
        <EyeOff
          v-if="isShown"
          :size="iconSize"
        />
        <Eye
          v-else
          :size="iconSize"
        />
      </button>
    </template>
  </FormInput>
</template>

<style scoped lang="scss">
.button {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  height: 100%;

  cursor: pointer;
}
</style>
