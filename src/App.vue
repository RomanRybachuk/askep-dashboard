<script setup lang="ts">
import { computed, onMounted } from "vue";
import PageLoader from "@/components/PageLoader.vue";
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
  appStore.addUIPageBlokers(1);

  const user = await userService.getUserState();

  if (!user && appStore.layoutName !== "auth") {
    await router.push("/signin");
  } else if (user && appStore.layoutName !== "dashboard") {
    await router.push("/");
  }

  appStore.addUIPageBlokers(-1);

  if (user) {
    userService.getUserData();
  }
});
</script>

<template>
  <component :is="layoutComponent">
    <router-view></router-view>
  </component>
  <page-loader></page-loader>
</template>

<style lang="scss"></style>
