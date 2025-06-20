<script setup lang="ts">
import { useForm } from "@/composables/useForm";
import PasswordInput from "@/components/forms/PasswordInput.vue";
import FormField from "@/components/forms/FormField.vue";
import FormInput from "@/components/forms/FormInput.vue";
import AuthFormBtn from "@/features/auth/forms/partials/AuthFormBtn.vue";
import { loginValidator } from "@/features/auth/forms/validators";
import AuthBottomLink from "@/features/auth/forms/partials/AuthBottomLink.vue";
import AuthResponseError from "@/features/auth/forms/partials/AuthResponseError.vue";
import { useAppAlertStore } from "@/stores/appAlert";
import { setAuthToken } from "@/utils/localStorage";
import { ALERT_SEVERITY } from "@/types/common";
import httpClient from "@/utils/httpClient";
import router from "@/router";

const alert = useAppAlertStore();
const form = useForm(
  {
    email: "",
    password: "",
  },
  loginValidator,
  async () => {
    try {
      const res: { token: string } = await httpClient.POST("/api/auth/login", {
        init: {
          body: JSON.stringify(form.state),
        },
      });

      if (res.token) {
        setAuthToken(res.token);

        alert.show({
          description: "Successfully logged in, redirecting to the Dashboard page",
          severity: ALERT_SEVERITY.INFO,
        });

        router.push({ name: "dashboard" });
      }
    } catch (e) {
      form.setResponseError("Failed to login, please try again");
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
        Login
      </AuthFormBtn>
      <AuthBottomLink to="/auth/register">Register</AuthBottomLink>
    </div>
  </form>
</template>
