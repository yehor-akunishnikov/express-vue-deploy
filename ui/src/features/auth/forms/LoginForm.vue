<script setup lang="ts">
import { useForm } from "@/composables/useForm.ts";
import PasswordInput from "@/components/forms/PasswordInput.vue";
import FormField from "@/components/forms/FormField.vue";
import FormInput from "@/components/forms/FormInput.vue";
import AuthFormBtn from "@/features/auth/partials/AuthFormBtn.vue";
import { loginValidator } from "@/features/auth/forms/validators.ts";
import AuthBottomLink from "@/features/auth/partials/AuthBottomLink.vue";
import router from "@/router";

const form = useForm(
  {
    email: "",
    password: "",
  },
  loginValidator,
);

const onSubmit = async () => {
  form.setDirty();

  if (form.isValid) {
    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify(form.state),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());

      console.log(response);

      await router.push("/");
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<template>
  <form @submit.stop.prevent="onSubmit">
    <div class="space-y-3 mb-6">
      <FormField
        id="email-input"
        label="Email"
        :error-msg="form.errorState.value?.email?.errorMessage"
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
        :error-msg="form.errorState.value?.password?.errorMessage"
      >
        <PasswordInput
          v-model="form.state.password"
          id="password-input"
          name="password"
        />
      </FormField>
    </div>

    <div class="space-y-2">
      <AuthFormBtn type="submit">Login</AuthFormBtn>
      <AuthBottomLink to="/auth/register">Register</AuthBottomLink>
    </div>
  </form>
</template>
