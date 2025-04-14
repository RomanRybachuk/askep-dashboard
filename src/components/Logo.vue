<script setup lang="ts">
defineProps({
  maxWidth: {
    type: Number,
    default: 120,
  },
});
</script>

<template>
  <div class="logo" :style="{ maxWidth: maxWidth + 'px' }">
    <router-link class="logo__link" to="/">
      <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  &__link {
    width: 100%;
  }
}
</style>
