<script setup lang="ts">
import { useUserService } from "@/store/services/User";

import Field from "@/components/ui/Field.vue";
import Btn from "@/components/ui/Btn.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const props = defineProps({
  type: {
    type: String as () => "signin" | "signup",
    default: "signin",
  },
});

const authData = computed(() => {
  return {
    buttonSubmitText: props.type === "signin" ? "Sign In" : "Sign up",
    buttonSwitchTypeText: props.type === "signin" ? "Sign up" : "Sign in",
    buttonSwitchTypeLink: props.type === "signin" ? "/signup" : "signin",
  };
});

const userService = useUserService();
const emailValue = ref("roman.rybachuk.work@gmail.com");
const passwordValue = ref("123456789");

async function handleClickSubmit() {
  if (!emailValue.value || !passwordValue.value) return;

  switch (props.type) {
    case "signin":
      await userService.userSignIn(emailValue.value, passwordValue.value);

      break;
    case "signup":
      await userService.userSignUp(emailValue.value, passwordValue.value);

      break;
  }

  router.push("/");
}
</script>

<template>
  <div class="auth-page">
    <form @submit.prevent="handleClickSubmit">
      <field type="email" v-model="emailValue" label="Email"></field>
      <field type="password" v-model="passwordValue" label="Password"></field>
      <btn type="submit">{{ authData.buttonSubmitText }}</btn>
    </form>
    <br />
    <br />
    <btn :to="authData.buttonSwitchTypeLink">{{
      authData.buttonSwitchTypeText
    }}</btn>
  </div>
</template>

<style scoped></style>
