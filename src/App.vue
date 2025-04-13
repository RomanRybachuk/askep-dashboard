<script setup lang="ts">
import { computed } from "vue";

// import { useRoute } from "vue-router";

import AuthLayout from "@/layouts/Auth.vue";
import DashboardLayout from "@/layouts/Dashboard.vue";

// const route = useRoute();

import { useAppStore } from "@/store";

const appStore = useAppStore();

const layoutComponent = computed(() => {
  switch (appStore.layoutName) {
    case "auth":
      return AuthLayout;
    case "dashboard":
      return DashboardLayout;
  }
});
</script>

<template>
  <component :is="layoutComponent">
    <router-view></router-view>
  </component>
</template>

<style scoped></style>
