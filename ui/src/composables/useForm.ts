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
  const responseError = ref<string | null>(null);
  const responseErrorTimeout = ref<number | null>(null);

  const errorState = computed<ErrorState>((): ErrorState => {
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

  const isValid = computed<boolean>(() => {
    if (isDirty.value) {
      return Object.values(errorState.value).every((value) => !value);
    } else {
      return true;
    }
  });

  async function handleSubmit(e: Event): Promise<void> {
    isDirty.value = true;

    if (isValid.value) {
      try {
        isLoading.value = true;

        await onSubmit(e);
      } finally {
        isLoading.value = false;
      }
    }
  }

  function setResponseError(text: string): void {
    responseError.value = text;

    if (responseErrorTimeout.value) {
      clearTimeout(responseErrorTimeout.value);
    }

    responseErrorTimeout.value = setTimeout(() => {
      responseError.value = null;
    }, 3000);
  }

  return {
    state,
    errorState,
    isLoading,
    isDirty,
    isValid,
    responseError,
    handleSubmit,
    setResponseError,
  };
};
