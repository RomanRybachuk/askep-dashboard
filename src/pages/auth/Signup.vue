<script setup lang="ts">
import { ref, watch } from "vue";

import Field from "@/components/form/Field.vue";
import Btn from "@/components/Btn.vue";

import { useUserService } from "@/store/services/User";

const emailValue = ref("roman.rybachuk.work@gmail.com");
const passwordValue = ref("123456789");

const userService = useUserService();

watch(
  () => emailValue.value,
  () => {
    console.log("asf");
  }
);

function handleClickSubmit() {
  if (!emailValue.value || !passwordValue.value) return;

  userService.signUp(emailValue.value, passwordValue.value);
}
</script>

<template>
  <div class="auth-page">
    <form @submit.prevent="handleClickSubmit">
      <field type="email" v-model="emailValue" label="Email"></field>
      <field type="password" v-model="passwordValue" label="Password"></field>
      <btn type="submit">Sign up</btn>
    </form>
  </div>
</template>

<style scoped></style>
