import { computed, reactive, ref } from "vue";
import { z, ZodType } from "zod/v4";

type ErrorState = Record<string, string>;

export const useForm = <T extends Record<string, unknown>>(
  defaultValue: T,
  validator: ZodType,
  onSubmit: (e: Event) => Promise<void>,
) => {
  const state = reactive<T>(defaultValue);
  const isDirty = ref(false);
  const isLoading = ref(false);

  const errorState = computed((): ErrorState => {
    const errorsMap: ErrorState = {};

    if (!isDirty.value) {
      return errorsMap;
    }

    const validationResult = validator.safeParse(state);

    if (validationResult.error) {
      const errors = z.flattenError(validationResult.error);

      Object.entries(errors.fieldErrors).forEach(([key, value]) => {
        errorsMap[key] = (value as string[])[0];
      });

      if (errors.formErrors) {
        errorsMap.formErrors = errors.formErrors[0];
      }
    }

    return errorsMap;
  });

  function isValid(): boolean {
    return Object.values(errorState.value).every((value) => !value);
  }

  async function handleSubmit(e: Event) {
    isDirty.value = true;

    if (isValid()) {
      try {
        isLoading.value = true;

        await onSubmit(e);
      } finally {
        isLoading.value = false;
      }
    }
  }

  return {
    state,
    errorState,
    isLoading,
    isDirty,
    handleSubmit,
  };
};
