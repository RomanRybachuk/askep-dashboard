<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import LogoutButton from "@/components/LogoutButton.vue";

import { useUserService } from "@/store/services/User";

const userService = useUserService();
</script>

<template>
  <section
    class="layout layout-dashboard d-flex flex-column"
    v-if="userService.authUser"
  >
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
    <main>
      <slot></slot>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">Design by Astwellsoft Release 1088</div>
      </div>
    </footer>
  </section>
</template>

<style scoped lang="scss">
main {
  flex: 1 0 auto;
}

.layout {
  min-height: 100vh;
}

.header {
  &__inner {
    padding: 10px 0;
    font-size: 14px;
  }
}

.footer {
  background-color: rgba(var(--color-black), 1);

  &__inner {
    padding: 10px;
    color: rgba(var(--color-white), 1);
    text-align: center;
    font-size: 12px;
  }
}
</style>
