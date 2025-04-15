<script setup lang="ts"></script>

<template>
  <div class="logo">
    <router-link class="logo__link" to="/">
      <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  flex: 1 0 auto;
  max-width: 120px;

  &__link {
    width: 100%;
  }
}
</style>
