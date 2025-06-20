<script setup lang="ts">
import { useForm } from "@/composables/useForm";
import AuthResponseError from "@/features/auth/forms/partials/AuthResponseError.vue";
import PasswordInput from "@/components/forms/PasswordInput.vue";
import FormField from "@/components/forms/FormField.vue";
import FormInput from "@/components/forms/FormInput.vue";
import AuthFormBtn from "@/features/auth/forms/partials/AuthFormBtn.vue";
import { registerValidator } from "@/features/auth/forms/validators";
import AuthBottomLink from "@/features/auth/forms/partials/AuthBottomLink.vue";
import httpClient from "@/utils/httpClient";
import router from "@/router";
import { useAppAlertStore } from "@/stores/appAlert";
import { ALERT_SEVERITY } from "@/types/common";

const alert = useAppAlertStore();
const form = useForm(
  {
    email: "",
    name: "",
    password: "",
  },
  registerValidator,
  async () => {
    try {
      await httpClient.POST("/api/auth/register", {
        init: {
          body: JSON.stringify(form.state),
        },
      });

      alert.show({
        description: "Successfully registered, redirecting to the Login page",
        severity: ALERT_SEVERITY.INFO,
      });

      router.push({ name: "auth:login" });
    } catch (e) {
      form.setResponseError("Failed to register, please try again");
    }
  },
);
</script>

<template>
  <form @submit.stop.prevent="form.handleSubmit">
    <div class="space-y-3">
      <FormField
        id="email-input"
        label="Email"
        :error-msg="form.errorState.value?.email"
      >
        <FormInput
          v-model="form.state.email"
          type="text"
          id="email-input"
          name="email"
        />
      </FormField>

      <FormField
        id="name-input"
        label="Nickname"
        :error-msg="form.errorState.value?.name"
      >
        <FormInput
          v-model="form.state.name"
          type="text"
          id="name-input"
          name="name"
        />
      </FormField>

      <FormField
        id="password-input"
        label="Password"
        :error-msg="form.errorState.value?.password"
      >
        <PasswordInput
          v-model="form.state.password"
          id="password-input"
          name="password"
        />
      </FormField>
    </div>

    <div class="space-y-2">
      <AuthResponseError :text="form.responseError.value" />
      <AuthFormBtn
        :disabled="form.isLoading.value"
        type="submit"
      >
        Register
      </AuthFormBtn>
      <AuthBottomLink to="/auth/login">Login</AuthBottomLink>
    </div>
  </form>
</template>
