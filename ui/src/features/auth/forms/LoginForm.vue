<script setup lang="ts">
import { useForm } from "@/composables/useForm";
import PasswordInput from "@/components/forms/PasswordInput.vue";
import FormField from "@/components/forms/FormField.vue";
import FormInput from "@/components/forms/FormInput.vue";
import AuthFormBtn from "@/features/auth/partials/AuthFormBtn.vue";
import { loginValidator } from "@/features/auth/forms/validators";
import AuthBottomLink from "@/features/auth/partials/AuthBottomLink.vue";
import { useAppAlertStore } from "@/stores/appAlert";
import { setAuthToken } from "@/utils/localStorage";
import httpClient from "@/utils/httpClient";
import { ALERT_SEVERITY } from "@/types/common";
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

        router.push({ name: "dashboard" });
      }
    } catch (e) {
      alert.show({
        description: "Failed to login, please try again",
        severity: ALERT_SEVERITY.ERROR,
      });
    }
  },
);
</script>

<template>
  <form @submit.stop.prevent="form.handleSubmit">
    <div class="space-y-3 mb-6">
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
