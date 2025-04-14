<script setup lang="ts">
import { computed, onMounted } from "vue";

// import { useRoute } from "vue-router";

import AuthLayout from "@/layouts/Auth.vue";
import DashboardLayout from "@/layouts/Dashboard.vue";

// const route = useRoute();

import { useAppStore } from "@/store";
import { authState } from "@/firebase";

const appStore = useAppStore();

const layoutComponent = computed(() => {
  switch (appStore.layoutName) {
    case "auth":
      return AuthLayout;
    case "dashboard":
      return DashboardLayout;
  }
});

onMounted(async () => {
  console.log(await authState());
});
</script>

<template>
  <component :is="layoutComponent">
    <router-view></router-view>
  </component>
</template>

<style scoped lang="scss">
body {
  background-color: $red;
}
</style>
