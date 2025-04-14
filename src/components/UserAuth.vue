<script setup lang="ts">
import { useUserService } from "@/store/services/User";
import { useAppStore } from "@/store";

import Field from "@/components/ui/Field.vue";
import Btn from "@/components/ui/Btn.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const appStore = useAppStore();

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

const errorMessage = ref("");

async function handleClickSubmit() {
  if (!emailValue.value || !passwordValue.value) {
    errorMessage.value = "There is some error";
  }

  errorMessage.value = "";

  appStore.addUIPageBlokers(1);

  switch (props.type) {
    case "signin":
      try {
        await userService.userSignIn(emailValue.value, passwordValue.value);

        router.push("/");
      } catch (e: any) {
        errorMessage.value = "There is some error";
      }

      break;
    case "signup":
      try {
        await userService.userSignUp(emailValue.value, passwordValue.value);

        router.push("/");
      } catch (e: any) {
        errorMessage.value = "There is some error";
      }

      break;
  }

  appStore.addUIPageBlokers(-1);
}
</script>

<template>
  <div class="auth-page">
    <form @submit.prevent="handleClickSubmit">
      <field type="email" v-model="emailValue" label="Email"></field>
      <field type="password" v-model="passwordValue" label="Password"></field>
      <btn type="submit">{{ authData.buttonSubmitText }}</btn>
      <p>{{ errorMessage }}</p>
    </form>
    <br />
    <br />
    <btn :to="authData.buttonSwitchTypeLink">{{
      authData.buttonSwitchTypeText
    }}</btn>
  </div>
</template>

<style scoped></style>
