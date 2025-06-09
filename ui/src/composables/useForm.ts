import { computed, reactive, ref } from "vue";
import { z, ZodType } from "zod/v4";

type ErrorState = Record<
  string,
  {
    errorMessage?: string;
  }
>;

export const useForm = <T extends Record<string, unknown>>(defaultValue: T, validator: ZodType) => {
  const state = reactive<T>(defaultValue);
  const isDirty = ref(false);

  const errorState = computed((): ErrorState => {
    const errorsMap: ErrorState = {};

    if (!isDirty.value) {
      return errorsMap;
    }

    const validationResult = validator.safeParse(state);

    if (validationResult.error) {
      const errors = z.flattenError(validationResult.error);

      Object.entries(errors.fieldErrors).forEach(([key, value]) => {
        errorsMap[key] = { errorMessage: (value as string[])[0] };
      });

      if (errors.formErrors) {
        errorsMap.formErrors = { errorMessage: errors.formErrors[0] };
      }
    }

    return errorsMap;
  });

  const isValid = computed(() =>
    Object.values(errorState.value).every((value) => !value.errorMessage),
  );

  return {
    state,
    errorState,
    setDirty: () => {
      isDirty.value = true;
    },
    isValid,
  };
};
