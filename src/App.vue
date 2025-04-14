<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useRouter } from "vue-router";

import AuthLayout from "@/layouts/Auth.vue";
import DashboardLayout from "@/layouts/Dashboard.vue";

const router = useRouter();

import { useAppStore } from "@/store";
import { useUserService } from "@/store/services/User";

const appStore = useAppStore();
const userService = useUserService();

const layoutComponent = computed(() => {
  switch (appStore.layoutName) {
    case "auth":
      return AuthLayout;
    case "dashboard":
      return DashboardLayout;
  }
});

onMounted(async () => {
  const user = await userService.getUserState();

  if (!user && appStore.layoutName !== "auth") {
    router.push("/signin");
  } else if (user && appStore.layoutName !== "dashboard") {
    router.push("/");
  }
});
</script>

<template>
  <component :is="layoutComponent">
    <router-view></router-view>
  </component>
</template>

<style lang="scss"></style>
