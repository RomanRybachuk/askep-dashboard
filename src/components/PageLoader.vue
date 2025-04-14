<script setup lang="ts">
import { useAppStore } from "@/store";
const appStore = useAppStore();
</script>

<template>
  <div class="loader" :class="{ active: appStore.UIPageBlokers > 0 }">
    <span class="loader-animation"></span>
  </div>
</template>

<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--color-white), 1);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  &.active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

.loader-animation {
  width: 48px;
  height: 48px;
  position: relative;
}

.loader-animation::after,
.loader-animation::before {
  content: "";
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(var(--color-black), 1);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader-animation::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
