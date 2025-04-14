<script setup lang="ts">
defineProps({
  type: {
    type: String as () => "submit" | "button",
    default: "button",
  },
  to: {
    type: String,
  },
  size: {
    type: String as () => "small" | "large" | "normal",
    default: "small",
  },
});
</script>

<template>
  <div class="btn">
    <v-btn :to="to" :type="type" :size="size">
      <slot></slot>
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
