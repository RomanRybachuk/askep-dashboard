<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import LogoutButton from "@/components/LogoutButton.vue";

import { useUserService } from "@/store/services/User";

const userService = useUserService();
</script>

<template>
  <section class="layout layout-dashboard" v-if="userService.authUser">
    <header class="header">
      <div class="container">
        <div
          class="header__inner d-flex justify-space-between align-center ga-4"
        >
          <logo></logo>
          <div class="d-flex align-center ga-3">
            <div>{{ userService.authUser.email }}</div>
            <logout-button></logout-button>
          </div>
        </div>
      </div>
    </header>
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.header {
  &__inner {
    padding: 10px 0;
    font-size: 14px;
  }
}
</style>
