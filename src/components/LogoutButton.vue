<script setup lang="ts">
import Btn from "@/components/ui/Btn.vue";
import { useRouter } from "vue-router";
import { useUserService } from "@/store/services/User";

const router = useRouter();
const userService = useUserService();

async function handleClickLogout() {
  await userService.userSignOut();

  router.push("/signin");
}
</script>

<template>
  <btn @click="handleClickLogout">Logout</btn>
</template>

<style scoped lang="scss"></style>
